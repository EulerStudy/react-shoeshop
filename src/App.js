// npm install @reduxjs/toolkit react-redux

import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import data from './data';
import { Suspense, createContext, lazy, useDeferredValue, useEffect, useState, useTransition } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
// import Detail from './routes/Detail';
// import Cart from './routes/Cart';

const Detail = lazy(() => import('./routes/Detail'))
const Cart = lazy(() => import('./routes/Cart'))

export const context = createContext()

const array = new Array(10000).fill(0)

function App() {
  const [shoes, setShoes] = useState(data)
  const [temp] = useState([1, 2, 3])
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()  // 로딩중일 때 isPending은 true
  const [name, setName] = useState('')
  const state = useDeferredValue(setName)  // 변동 사항이 생기면 늦게 처리해 줌

  const result = useQuery('data', () => {
    return axios.get('https://codingapple1.github.io/userdata.json')
          .then((res)=>{
            return res
          }),
    { staleTime: 2000 }  // 2초마다 refetch
  })

  /*
    result.data      // axios가 성공했을 때
    result.isLoading // 로딩중일 때
    result.error     // 실패했을 때
  */

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('watched'))
    if (data.length === 0)
      localStorage.setItem('watched', JSON.stringify([]))
  },[])

  return (
    <div className="App">
      <input onChange={(e) => {
        startTransition(() => {
          // 실행 빈도가 높은 컴포넌트를 startTransition() 안에 넣어준다. 그러면 성능 향상이 발생한다. 코드 시작을 뒤로 늦춰줌
          setName(e.target.value)  
        })}} />                    
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto' style={{color: 'white'}}>
            {
              result.isLoading ? '로딩중' : result.data.name
            }
            KIM
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route path='/' element={
            <>
              <div className='main-bg'></div>
              <div className='container'>
                <div className='row'>
                  {
                    shoes.map((val, i) => {
                      return (
                        <Card shoes={shoes[i]} i={i+1} key={i} />
                      )
                    })
                  }
                </div>
              </div>
              <button onClick={() => {
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((result)=>{
                    console.log(result.data)
                    console.log(shoes)
                    const copy = [...shoes, ...result.data]
                    setShoes(copy)
                  })  // [{..},{..},{..}]
                  .catch(()=>{console.log('실패함')})
                }}>더보기</button>
            </>
          } />
            <Route path='/detail/:id' element={
                <context.Provider value={{shoes, temp}}>
                  <Detail shoes={shoes} /> 
                </context.Provider>
              }
            />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<About />}>
            <Route path="member" element={<div>어바웃에 멤버페이지임</div>} />
            <Route path="location" element={<div>어바웃에 위치페이지임</div>} />
          </Route>
          <Route path='*' element={<div>없는 페이지입니다.</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

/*
ajax POST 요청
axios.post('/shop', {name: 'kim'})

ajax를 여러곳으로 요청하고 싶을 때 (두 개 다 성공했을 때)
Promise.all([axios.get('/urls1'), axios.get('/urls2')])
.then(()=>{})

fetch('/url/data.json')
.then(결과=>결과.json())  JSON -> array/object 변환과정 필요
.then(data=>{})
*/

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet />
    </div>
  )
}

function Card(props) {
  return (
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width='80%' />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
