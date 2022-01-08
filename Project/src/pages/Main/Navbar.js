import React from 'react';
import styled from 'styled-components';
import logo from'../../img/logo.jpg';
import {
    Link
}from 'react-router-dom'

const Navbar = ({authenticated,navBarSelect}) =>
{
    const buttonLogout=() =>{
      console.log("로그아웃")
    }
    const select0 =() =>
    {
      navBarSelect(0)
    }
    const select1 =() =>
    {
      navBarSelect(1)
    }

    return(
    <NavBar>
      
      
        
          <NavListFront>
            <NavBrand>
              <Link to="/">
                <img src={logo} alt="" width="150" height="50"/>
              </Link>
            </NavBrand>
          
            <NavItem>
              
                <Link to="community" onMouseOver={select0} >
                  <NavText>커뮤니티</NavText>
                </Link>
              
            </NavItem>

            <NavItem>
              <Link to="store" onMouseOver={select1}>
                <NavText>스토어</NavText>
              </Link>
            </NavItem>
            
          </NavListFront>
          
        
          <NavListBack>
              <NavItem>
                    <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button class="btn btn-outline-success" type="submit" style={{width :80}}>검색</button>
                    </form>
              </NavItem>
          

         
{authenticated? //로그인 여부에 따른 조건부 렌더링

            <NavItem>
              <button class="btn btn-danger" onClick={buttonLogout}>로그아웃</button>
            </NavItem>         
      :
          <NavItem>
            <NavItem>
              <Link  to="/login">
                <NavText>로그인</NavText>
              </Link>
            </NavItem>
            <NavItem>
              <Link  to="/signup">
                <NavText>회원가입</NavText>
              </Link>
            </NavItem>
          </NavItem>
}
          </NavListBack>
    
    </NavBar>
    );
};

const NavBrand =styled.div`
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    text-decoration: none;
    white-space: nowrap;
`
const NavListFront = styled.ul`
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
`
const NavListBack = styled.ul`
    display: flex;
    margint-left : 0;
    margin-bottom: 0;
    list-style: none;
    
    

`
const NavItem = styled.li`
    display: flex;
    text-align: -webkit-match-parent;
`
const NavText =styled.div`
  position: relative;
  display: inline-block;
  margin: 6px 10px 0;
  padding: 14px 6px;
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
  color: #424242;
  cursor: pointer;
`
const NavBar = styled.nav`
    position: relative;
    width : 1256px;
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #ededed;
    margin:0 auto;
}
`
export default Navbar