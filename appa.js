const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3001

app.use(express.json())
app.use(cookieParser())

const users = [
    {name: "형섭", id: "hs", password: "1234"},
    {name: "하이", id: "hi", password: "5678"},
    {name: "몰라", id: "ml", password: "9012"}
]


app.get('/users', (req,res) => {

    // console.log("user-id", req.cookies.userId) // 쿠키 구워졌는지 확인
    const userId = req.cookies.userId
    let user
    for (i = 0; i < users.length; i++) {
        if (userId === users[i].id) {
            user = users[i]
        }
    }

    res.send(user)
})
// 2. 로그인된 USER 정보 가져오기
// 	- 쿠키에 User id 를 가져온다.
// 		1. 쿠키에 저장된 user.id 를 가지고 그대로 찾는다
// 		2. session 을 통해 user id 를 가져온다.
// 		3. 암화화된 user.id 를 복호화 하여 가져온다.
//     4. JWT 토큰을 유효성 검증한다.(verify)
// 	- 가져온 user id 로 user 를 find 해서 응답한다.

app.post('/login', (req,res) => {
    const userId = req.body.id
    const password = req.body.password
    
    let user
    for (i = 0; i < users.length; i++) {
        if (userId === users[i].id && password === users[i].password) {
            user = users[i]
        }
    }

    if (!user) {
        return res.send("회원 아님")
    }

    res.cookie('userId', user.id) // 쿠키 굽는 방법
    res.send('login')
})

// 1. 로그인 API
// 	- 클라이언트에게서 로그인 아이디 / (패스워드) 받아서 , user 정보를 찾아온다
// 	- 찾아온 정보를 COOKIE 넣어서 응답한다.
// 		- 쿠키에 넣는 방식
// 			1. user.id 를 그대로 넣어준다
// 			2. session 을 사용하여 넣어준다.
// 			3. user.id 를 암호화 해서 넣어준.
//       4. JWT 토큰을 만든다. (sign)

app.listen(port, () => {
    console.log(port, '서버 연결')
})

