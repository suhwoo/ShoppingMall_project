import React, { Fragment, useState, useEffect } from 'react'
import { Text, Input, Button, Image } from './elements'
import styled from 'styled-components'
import $ from 'jquery'

const Signup = () => {
  // 버튼 위에 마우스가 올려져 있을 때 색 변경을 관리하는 state
  const [emailButtonColor, setEmailButtonColor] = useState('white')
  const [signupButtonColor, setSignupButtonColor] = useState('#35c4ef')

  // 회원가입에 필요한 기본적인 계정 정보 관리하는 state
  const [form, setForm] = useState({
    email: '',
    emailSuffix: '',
    password: '',
    repassword: '',
    nickname: '',
  })

  // 형식에 맞지 않을 때 글씨를 빨간색으로 바꿔줄 state
  const [textColor, setTextColor] = useState({
    email: 'black',
    password: 'black',
    repassword: 'black',
    nickname: 'black',
  })

  // 형식에 맞는지 여부를 알려주는 text를 관리하는 state
  const [emailCheckMsg, setEmailCheckMsg] = useState('')
  const [passwordCheckMsg, setPasswordCheckMsg] = useState('')
  const [passwordRightMsg, setPasswordRightMsg] = useState('')
  const [nicknameCheckMsg, setNicknameCheckMsg] = useState('')

  const [emailCheck, setEmailCheck] = useState('') // 이메일 중복 확인 완료 상태 임시 저장

  // form값을 불러오고 바뀐 값만 form에 새로 대체해줌
  const handleChange = (e) => {
    const changed = {
      ...form,
      [e.target.name]: e.target.value,
    }
    console.log(changed)
    setForm(changed)
  }

  // 이메일 형식 체크 정규식
  const emailRegExp = (str) => {
    str = str + '@' + form.emailSuffix
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    return regExp.test(str) ? true : false
  }

  // 이메일 형식 체크 함수
  const emailCheckFunc = () => {
    if (emailRegExp(form.email) || form.email.length === 0) {
      setEmailCheckMsg('')
      setTextColor({ email: 'black' })
    } else {
      setEmailCheckMsg('이메일 형식이 올바르지 않습니다.')
      setTextColor({ email: 'red' })
    }
    setEmailCheck('') // emailCheckFunc이 실행될 때마다(email 값이 바뀔 때마다) ''로 초기화
  }

  const testEmailCertification = (str) => {
    // 이메일 인증하기 버튼 눌렀을 때 인증 실패하면 메시지 띄우면 됨(이메일 형식 예외 케이스 굳이 안 짜도 됨)
    // 이메일이 가입된 이메일인지, 아니라면 이메일 형식에 맞는지 -> 맞다면 인증 코드 전송

    if (str === 'test@naver.com') {
      setEmailCheckMsg('이미 가입된 이메일입니다.')
    } else {
      setEmailCheckMsg('')
      emailCheckFunc()
      if (emailCheckMsg === '') alert('이메일에서 인증 코드를 확인해주세요.')
    }
    setEmailCheck(str) // 어떤 경우에서든 emailCheck 값 변경
  }

  // 비밀번호와 비밀번호 확인이 일치하거나, 비밀번호 확인 칸이 비어있는 경우 true 반환
  const pEqualR = () => {
    return form.password === form.repassword || form.repassword.length === 0
  }

  // 영문, 숫자를 포함한 8자 이상의 비밀번호 형식 체크 정규식 (정의된 특수문자도 사용 가능)
  const passwordRegExp = (str) => {
    var regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()-_+|=]{8,}$/
    return regExp.test(str) ? true : false
  }

  // 비밀번호 형식 체크 함수
  const passwordCheckFunc = () => {
    if (passwordRegExp(form.password) || form.password.length === 0) {
      setPasswordCheckMsg('')
      setTextColor({ password: 'black' })
    } else {
      setPasswordCheckMsg(
        '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.',
      )
      setTextColor({ password: 'red' })
      console.log('red')
    }
  }

  // 2자 이상 15자 이하의 영문, 숫자, 한글로 이루어진 닉네임 형식 체크 정규식
  const nicknameRegExp = (str) => {
    var regExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,14}$/
    return regExp.test(str) ? true : false
  }

  // 닉네임 형식 체크 함수
  const nicknameCheckFunc = () => {
    if (nicknameRegExp(form.nickname) || form.nickname.length === 0) {
      setNicknameCheckMsg('')
      setTextColor({ nickname: 'black' })
    } else if (form.nickname.length < 2) {
      setNicknameCheckMsg('2자 이상 입력해주세요.')
      setTextColor({ nickname: 'red' })
    } else if (form.nickname.length > 15) {
      setNicknameCheckMsg('15자 이하로 입력해주세요.')
      setTextColor({ nickname: 'red' })
    }
  }

  const signupCheckFunc = () => {
    if (
      form.email + '@' + form.emailSuffix === emailCheck && // 임시 저장 값 == 현재 이메일 칸에 들어있는 값 이어야함
      form.email.length > 0 &&
      emailCheckMsg === '' &&
      form.password.length > 0 &&
      passwordCheckMsg === '' &&
      passwordRightMsg === '' &&
      form.password === form.repassword &&
      form.nickname.length > 0 &&
      nicknameCheckMsg === ''
    ) {
      alert('회원가입이 완료되었습니다.')
    } else alert('입력하신 정보를 다시 확인해주세요.')
  }

  useEffect(() => {
    // selectBar에서 직접입력을 선택했을 때, selectBar 가리고 이메일 주소 직접 입력 창 띄움
    $(function () {
      $('#direct').hide()
      $('#selectBar').on('change', function () {
        if ($('#selectBar').val() === 'direct') {
          $('#direct').show()
          $('#selectBar').hide()
        } else {
          $('#direct').hide()
        }
      })
    })
  }, [])

  const backToSelectBar = () => {
    // 이메일 주소 직접 입력 창에서 x 버튼 눌렀을 때 수행
    $(function () {
      $('#direct').hide()
      $('#selectBar').show()
      $('#selectBar').val('selected')
      $('#directBox').val('')
    })
  }

  useEffect(() => {
    // 이메일 값이 바뀔 때마다 이메일이 형식에 맞는지 확인
    emailCheckFunc()
  }, [form.email, form.emailSuffix])

  useEffect(() => {
    // 비밀번호 값이 바뀔 때마다 비밀번호가 형식에 맞는지 확인
    passwordCheckFunc()
  }, [form.password])

  useEffect(() => {
    // 비밀번호 확인 칸의 값이 바뀔 때마다 비밀번호가 일치하는지 확인
    if (pEqualR()) {
      setPasswordRightMsg('')
      setTextColor({ repassword: 'black' })
    } else {
      setPasswordRightMsg('비밀번호가 일치하지 않습니다.')
      setTextColor({ repassword: 'red' })
    }
  }, [form.password, form.repassword])

  useEffect(() => {
    // 닉네임 값이 바뀔 때마다 닉네임이 형식에 맞는지 확인
    nicknameCheckFunc()
  }, [form.nickname])

  return (
    <Fragment>
      <Container>
        <Header
          onClick={() => {
            alert('메인 페이지로 이동')
          }}
        >
          <Image
            width="50px"
            height="50px"
            src="https://image.rocketpunch.com/company/2425/bucketplace_logo_1520495612.png?s=400x400&t=inside"
            borderRadius="10px"
          />
          <Text weight="bold" size="24px" margin="0px 8px">
            오늘의집
          </Text>
        </Header>
        <SignupContainer>
          <Text weight="bold" size="20px" margin="8px 0px">
            회원가입
          </Text>
          <SocialLogin>
            <Text size="12px" margin="8px 0px">
              SNS계정으로 간편하게 회원가입
            </Text>
            <SocialLoginContainer>
              <SocialLoginImage>
                <a href="https://www.facebook.com">
                  <Image
                    width="55px"
                    height="55px"
                    borderRadius="55px"
                    src="https://blog.kakaocdn.net/dn/lhU48/btqRoQfJhbZ/9E6G4WxknrC7MPv2gV1DSk/img.jpg"
                  />
                </a>
              </SocialLoginImage>
              <SocialLoginImage>
                <a href="https://www.kakao.com">
                  <Image
                    width="55px"
                    height="55px"
                    borderRadius="55px"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/KakaoTalk_logo.svg/2500px-KakaoTalk_logo.svg.png"
                  />
                </a>
              </SocialLoginImage>
              <SocialLoginImage>
                <a href="https://www.naver.com">
                  <Image
                    width="55px"
                    height="55px"
                    borderRadius="55px"
                    src="https://play-lh.googleusercontent.com/jYtnK__ibJh9emODIgTyjZdbKym1iAj4RfoVhQZcfbG-DuTSHR5moHVx9CQnqg1yoco9"
                  />
                </a>
              </SocialLoginImage>
            </SocialLoginContainer>
          </SocialLogin>
          <EmailContainer>
            <Text
              weight="bold"
              size="18px"
              margin="8px 0px"
              color={textColor.email}
            >
              이메일
            </Text>
            <EmailInput>
              <Input
                name="email"
                placeholder="이메일"
                onInput={handleChange}
                borderColor={textColor.email}
              />
              <Text weight="bold" margin="0px 2px" size="20px" color="#cccccc">
                @
              </Text>
              <SelectBar
                id="selectBar"
                style={{ borderColor: textColor.email }}
                name="emailSuffix"
                onChange={handleChange}
                defaultValue="selected"
              >
                <option value="selected">선택해주세요</option>
                <option value="naver.com">naver.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="daum.net">daum.net</option>
                <option value="gmail.com">gmail.com</option>
                <option value="nate.com">nate.com</option>
                <option value="hotmail.com">hotmail.com</option>
                <option value="outlook.com">outlook.com</option>
                <option value="icloud.com">icloud.com</option>
                <option value="direct">직접입력</option>
              </SelectBar>
              <DirectBoxContainer id="direct">
                <Input
                  id="directBox"
                  name="emailSuffix"
                  placeholder="입력해주세요"
                  onInput={handleChange}
                  borderColor={textColor.email}
                />
                <button
                  style={{
                    backgroundColor: 'white',
                    border: 'none',
                    color: textColor.email,
                  }}
                  id="backToSelectBar"
                  onClick={backToSelectBar}
                >
                  X
                </button>
              </DirectBoxContainer>
            </EmailInput>
            <Text color="red" margin="12px 0px">
              {emailCheckMsg}
            </Text>
            <Button
              bgColor={emailButtonColor}
              onClick={() => {
                testEmailCertification(form.email + '@' + form.emailSuffix)
              }}
              onMouseOver={() => {
                setEmailButtonColor('#e6f4ff')
              }}
              onMouseLeave={() => {
                setEmailButtonColor('white')
              }}
            >
              <Text weight="bold" size="20px" color="#35c4ef" margin="14px">
                이메일 인증하기
              </Text>
            </Button>
          </EmailContainer>
          <PasswordContainer>
            <Text weight="bold" size="18px" color={textColor.password}>
              비밀번호
            </Text>
            <Password>
              <Text margin="8px 0px">
                영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
              </Text>
              <Input
                type="password"
                name="password"
                placeholder="비밀번호"
                onInput={handleChange}
                borderColor={textColor.password}
              />
            </Password>
            <Text color="red" margin="12px 0px">
              {passwordCheckMsg}
            </Text>
          </PasswordContainer>
          <PasswordCheckContainer>
            <Text weight="bold" size="18px" color={textColor.repassword}>
              비밀번호 확인
            </Text>
            <PasswordCheck>
              <Input
                type="password"
                name="repassword"
                placeholder="비밀번호 확인"
                onInput={handleChange}
                borderColor={textColor.repassword}
              />
            </PasswordCheck>
            <Text color="red" margin="12px 0px">
              {passwordRightMsg}
            </Text>
          </PasswordCheckContainer>
          <NicknameContainer>
            <Text weight="bold" size="18px" color={textColor.nickname}>
              닉네임
            </Text>
            <Nickname>
              <Text margin="8px 0px">
                다른 유저와 겹치지 않는 별명을 입력해주세요. (2~15자)
              </Text>
              <Input
                name="nickname"
                placeholder="별명 (2~15자)"
                onInput={handleChange}
                borderColor={textColor.nickname}
              />
            </Nickname>
            <Text color="red" margin="12px 0px">
              {nicknameCheckMsg}
            </Text>
          </NicknameContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: '8px',
            }}
          >
            <Button
              bgColor={signupButtonColor}
              onClick={signupCheckFunc}
              onMouseOver={() => {
                setSignupButtonColor('#74a9d4')
              }}
              onMouseLeave={() => {
                setSignupButtonColor('#35c4ef')
              }}
            >
              <Text weight="bold" size="20px" color="white" margin="14px">
                회원가입하기
              </Text>
            </Button>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text weight="400" margin="20px 0px">
                이미 아이디가 있으신가요?
              </Text>
              <Text
                weight="bold"
                margin="0px 8px"
                underline
                onClick={() => {
                  alert('로그인 페이지로 이동')
                }}
              >
                로그인
              </Text>
            </div>
          </div>
        </SignupContainer>
      </Container>
    </Fragment>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 1256px;
  height: 120vh;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 0px;
  margin-top: 32px;
`
const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 30%;
  height: 100%;
  padding: 4px;
`
const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 24px;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
`
const SocialLoginContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`
const SocialLoginImage = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 55px;
  margin: 0px 16px;
`
const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 12px 0px;
`
const EmailInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
const SelectBar = styled.select`
  padding: 14px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  box-sizing: border-box;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
`
const DirectBoxContainer = styled.div`
  display: flex;
  width: 100%;
`
const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 12px 0px;
`
const PasswordCheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`
const Password = styled.div`
  width: 100%;
`
const PasswordCheck = styled.div`
  width: 100%;
  margin: 8px 0px;
`
const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 12px 0px;
`

const Nickname = styled.div`
  width: 100%;
`
export default Signup
