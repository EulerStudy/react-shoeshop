import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Nav } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { context } from '../App'
import { addItem } from '../store'
import { useDispatch } from 'react-redux'

const YellowBtn = styled.button`
  background: yellow;
  color: black;
  padding: 10px;
`
const ColorBtn = styled.button`
  background: ${ props => props.bg };
  color: ${ props => props.bg === 'blue' ? 'white' : 'black'};
  padding: 10px;
`
const Box = styled.div`
  background: grey;
  padding: 20px;
`
// ColorBtn 복사
// const NewBtn = styled.button(YellowBtn)`
//   padding: 30px;
// ` 

function Detail(props) {
  const { id } = useParams()
  const [alert, setAlert] = useState(true)
  const [tab, setTab] = useState(0)
  const findShoes = props.shoes.find((x) => x.id === parseInt(id))
  console.log(id)
  console.log(props.shoes, findShoes)
  const dispatch = useDispatch()

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('watched'))
    data.push(findShoes.id)
    data = Array.from(new Set(data))
    localStorage.setItem('watched', JSON.stringify(data))
  }, [])

  useEffect(() => {
    const timer = setTimeout(()=>{
      setAlert(false)
    }, 2000)
    // useEffect가 실행되기 전에 먼저 실행 : 클리너펑션
    return () => {
      clearTimeout(timer)
    }
  }, [])

  /*
  useEffect(()=>{})    1. 재렌더링마다 코드 실행하고 싶으면
  useEffect(()=>{},[]) 2. mount시 1회 코드 실행하고 싶으면
  useEffect(()=>{      3. unmount시 1회 코드 실행하고 싶으면
    return () =>{      4. useEffect 실행전에 뭔가 실행하려면 언제나 return () => {}
    }                  5. 특정 state 변경시에만 실행하려면 [state명]
  })

  */

  return (
    <Container>
      {
        alert === true ?
          <div className='alert alert-warning'>
            2초이내 구매시 할인
          </div>
        : null
      }
      
      <Box>
        <YellowBtn>버튼</YellowBtn>
        <ColorBtn bg='blue'>버튼</ColorBtn>
        <ColorBtn bg='orange'>버튼</ColorBtn>
      </Box>
      <Row>
        <Col md={6}>
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </Col>
        <Col md={6}>
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <Button variant="danger" onClick={() => {
            dispatch(addItem({id: id, name: props.shoes[id].title, count: 1}))
          }}>주문하기</Button> 
        </Col>
      </Row>

      <Nav variant='tabs' defaultActiveKey='link0'>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(0)}} eventKey='link0'>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(1)}} eventKey='link1'>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(2)}} eventKey='link2'>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </Container>  
  )
}

function TabContent({tab}) {
  // if (tab === 0)
  //   return <div>내용0</div>
  // else if (tab === 1)
  //   return <div>내용1</div>
  // else if (tab === 2)
  //   return <div>내용2</div>
  const [fade, setFade] = useState('')
  const { shoes, temp } = useContext(context)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade('end')
    }, 100)
    console.log(shoes, temp)
    return () => {
      clearTimeout(timer)
      setFade('')
    }
  }, [tab])
 
  return (
    <>
      <div className={`start ${fade}`}>
      {
        [<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][tab]
      }
    </div>
    </>
  )
}

export default Detail