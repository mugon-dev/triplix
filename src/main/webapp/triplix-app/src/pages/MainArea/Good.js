import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Good = (props) => {

   const [gnum, setGnum] = useState();
   const [aaa, setAaa] = useState();
    useEffect(() => {
		 abcd(); 
        setGnum(props.goodnum);
    }, []);

	 function abcd(){
				setAaa(false);
		for (let index = 0; index < props.good.length; index++) {
			if(props.good[index].member.id === mid){
				setAaa(true);
				break;
			}

		}
	} 
	const isLogin = useSelector((store) => store.isLogin);
	console.log("qwqwqwqw",props);
	let mid = props.mid;
	let bid = props.bid;
	let goods = props.good;
	let picks = props.pick;
	let goodnum = props.goodnum;
	console.log("num!~!! :" , goodnum);
	let g_like = false;
	let p_like = false;
	function glike() {
		fetch("http://localhost:8000/good/save", {
			method: "POST",
			headers: {
				Authorization: localStorage.getItem("Authorization"),
				"Content-Type": "application/json; charset=utf-8",
			},
			body: bid,
		}).then(res => res.text())
			.then(res => {
				if (res === "ok") {
					setAaa(true);
					setGnum(gnum+1);
					alert("좋아요");
				}
			});
	}

	function unlike() {
		fetch("http://localhost:8000/good/delete", {
			method: "DELETE",
			headers: {
				Authorization: localStorage.getItem("Authorization"),
				"Content-Type": "application/json; charset=utf-8",
			},
			body: bid,
		}).then(res => res.text())
			.then(res => {
				if (res === "ok") {
					setAaa(false);
					setGnum(gnum-1);
					alert("좋아요 취소");
				}
			});
	}

	function p_register() {
		fetch("http://localhost:8000/pick/save", {
			method: "POST",
			headers: {
				Authorization: localStorage.getItem("Authorization"),
				"Content-Type": "application/json; charset=utf-8",
			},
			body: bid,
		}).then(res => res.text())
			.then(res => {
				if (res === "ok") {
					alert("찜하기~~!");
				}
			});
	}

	function p_unpick() {
		fetch("http://localhost:8000/pick/delete", {
			method: "DELETE",
			headers: {
				Authorization: localStorage.getItem("Authorization"),
				"Content-Type": "application/json; charset=utf-8",
			},
			body: bid,
		}).then(res => res.text())
			.then(res => {
				if (res === "ok") {
					alert("찜하기 취소");
				}
			});
	}

	return (
		<div>
			{isLogin ? (
				<>
					{aaa ? (
						<>
							<span><i class="fas fa-thumbs-up fa-5x" onClick={unlike}></i>({gnum})</span>
						</>
					):
						(
							<>
								<span><i class="far fa-thumbs-up fa-5x" onClick={glike}></i>({gnum})</span>
							</>
						)
					}
					{picks.map((pick) => pick.member.id === mid ? p_like = true : p_like = false)}
					{
						p_like ? <span><i class="fas fa-bookmark fa-5x" onClick={p_unpick}></i></span> :
							<span><i class="far fa-bookmark fa-5x" onClick={p_register}></i></span>
					}
				</>
			) : (
					<>
						<span><i class="far fa-thumbs-up fa-5x"></i>({gnum})</span>
						<span><i class="far fa-bookmark fa-5x"></i></span>
					</>
				)
			}
		</div>
	);
};

export default Good;