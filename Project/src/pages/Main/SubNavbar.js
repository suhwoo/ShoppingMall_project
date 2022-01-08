import React,{useState} from'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
const SubNavbar =({selectedTab ,subBarSelect}) =>{
    const select0 =() =>{ //
        subBarSelect(0)
    }
    const select1 =() =>{
        subBarSelect(1)
    }
    const select2 =() =>{
        subBarSelect(2)
    }
    const select3 =() =>{
        subBarSelect(3)
    }
    let now = null
    if(selectedTab === 0){ //0번탭
        now = 
<NavBar>
  
      <NavList>
        <NavItem>
          <Link to="#" onClick={select0}>
            <NavText>홈</NavText>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="#" onClick={select1}>
            <NavText>질문과 답변</NavText>
          </Link>
        </NavItem>
      </NavList>
      
    
</NavBar>
    

    }
    else{               //1번 탭
        now = 
<NavBar>
      <NavList>
        <NavItem>
          <Link to="#" onClick={select2}>
            <NavText>스토어</NavText>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="#" onClick={select3}>
            <NavText>카테고리</NavText>
          </Link>
        </NavItem>
      </NavList>
</NavBar>

    }

    return (
      <div>
          {now}
      </div>
    )
}

const NavItem = styled.li`
    display: flex;
    text-align: -webkit-match-parent;
`
const NavText =styled.div`
  position: relative;
  display: inline-block;
  margin: 6px 10px 0;
  padding: 7px 6px;
  font-size: 14px;
  line-height: 26px;
  font-weight: 700;
  color: #424242;
  cursor: pointer;
`
const NavList = styled.ul`
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
`
const NavBar = styled.nav`
    position: relative;
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #ededed;
    
}
`
export default SubNavbar