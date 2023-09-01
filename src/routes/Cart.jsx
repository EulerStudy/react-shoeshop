import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increase, changeName } from './../store/userSlice';
import { addCount } from '../store';
import { memo, useMemo, useState } from 'react';

const Child = memo(function() {  // props가 변할 때만 재렌더링 시켜줌
  console.log('재렌더링')
  return (
    <div>자식임</div>
  )
})

function func() {
  for (let i = 0; i < 1e9; i++) {

  }
}

function Cart() {
  // const state = useSelector((state)=>{ return state.user})
  const cart = useSelector((state)=> state.cart)
  const user2 = useSelector((state)=> state.user2)
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  
  const result = useMemo(() => {return func()}, [])  // 컴포넌트 렌더싱시 1회만 실행해줌, useEffet와 실행시점의 차이만 있다.

  return (
    <>
      <h6>{user2.name} {user2.age}의 장바구니</h6>
      <button onClick={() => {
        dispatch(increase(10))
      }}>버튼</button>
      <button onClick={()=>{setCount(count + 1)}}>재렌더링</button>
      <Child />
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((value, i) => 
              <tr key={i}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.count}</td>
                <td><button onClick={()=>{
                  console.log(value.id)
                  dispatch(addCount(value.id))
                }}>+</button></td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </>
  )
}

export default Cart