const { format } = require('date-fns');
const express = require('express');
const router = express.Router();

const data = [
    {
      id: 1,
      title: "들어갈 제목",
      body: "들어갈 내용",
      datetime : "2024.06.12"
    },
    {
      id: 2,
      title: "html",
      body: "하이퍼 텍스트 마크업 랭기지",
      datetime : "2024.06.12"
    },
    {
      id: 3,
      title: "css",
      body: "cascading style sheet",
      datetime : "2024.06.12"
    },
    {
      id: 4,
      title: "javascript",
      body: "동적인 데이터 처리를 하기 위한 적응력이 높은 frontend 언어",
      datetime : "2024.06.12"
    }
]

let idNum = data.length

router.route('/').get((req, res) => {
    data.sort((prev, next) => next.id - prev.id);
    res.json(data)
})
.post((req, res) => {
    const {title, body} = req.body;
    const newPost = {
        id : ++idNum,
        title,
        body,
        datetime : format(new Date(), 'yyyy.MM.dd')
    }


    data.push(newPost);
    console.log(data.length);
    res.json(newPost);
})


router.route('/:id')
// 삭제
.delete((req, res) => {
    const {id} = req.params;

    const num = data.findIndex(item=>item !== +id);
    const deleteItem = data.splice(num, 1);
    console.log(data.length);

    res.json(deleteItem[0]);
})
// 수정
.put((req, res) => {
    const {id} = req.params;
    const {title, body, datetime} = req.body;
    const newPost = {id, title, body};

    console.log(newPost);

    const num = data.findIndex(item=>item !== +id);
    data.splice(num, 1, newPost);
    console.log(data.length);

    res.json(newPost);
})

module.exports = router;