import React, { useEffect } from 'react';

const Good = (props) => {
	let mid = props.mid;
	let bid = props.bid;
	let goods = props.good;
	let like  = false;

	function glike() {
		fetch("http://localhost:8000/good/save", {
			method: "POST",
            headers: {
				Authorization: localStorage.getItem("Authorization"),
				"Content-Type": "application/json; charset=utf-8",
			},
			body: bid,
		}).then(res => res.text())
		.then(res=>{
			if(res==="ok"){
				alert("좋아요~~!");
			}
		});
	}

	function unlike(){
		fetch("http://localhost:8000/good/delete", {
			method: "DELETE",
            headers: {
				Authorization: localStorage.getItem("Authorization"),
				"Content-Type": "application/json; charset=utf-8",
			},
			body: bid,
		}).then(res => res.text())
		.then(res=>{
			if(res==="ok"){
				alert("좋아요 취소");
			}
		});
	}
	console.log(goods,"굿아이디어");
	useEffect(()=>{
		fetch("http://localhost:8000/board/").then().then();
	},[])
	return (
		<div>
			{goods.map((good)=> good.member.id === mid ? like= true : like = false)}
			{
				like ? <span><i id="like" class="fas fa-thumbs-up fa-5x" onClick={unlike}></i></span> : 
				       <span><i id="like" class="far fa-thumbs-up fa-5x" onClick={glike}></i></span>
			}
		</div>
	);
};

export default Good;