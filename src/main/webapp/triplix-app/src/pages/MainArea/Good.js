import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Good = (props) => {
   const [gnum, setGnum] = useState();
   const [like, setLike] = useState();
   const [mark , setMark] = useState();
    useEffect(() => {
		 check(); 
		 check2();
        setGnum(props.goodnum);
    }, []);

	 function check(){
		setLike(false);
		setMark(false);
		for (let index = 0; index < props.good.length; index++) {
			if(props.good[index].member.id === mid){
				setLike(true);
				setMark(true);
				break;
			}
		}
	} 
	function check2(){
		setMark(false);
		for (let index = 0; index < props.pick.length; index++) {
			if(props.pick[index].member.id === mid){
				setMark(true);
				break;
			}
		}
	}
	const isLogin = useSelector((store) => store.isLogin);
	let mid = props.mid;
	let bid = props.bid;
	let goods = props.good;
	let picks = props.pick;
	let goodnum = props.goodnum;
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
					setLike(true);
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
					setLike(false);
					setGnum(gnum-1);
					alert("좋아요 취소");
				}
			});
	}

	function pmark() {
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
					setMark(true);
					alert("찜하기~~!");
				}
			});
	}

	function unmakr() {
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
					setMark(false);
					alert("찜하기 취소");
				}
			});
	}

	return (
		<div>
			{isLogin ? (
				<>
					{like ? (
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
					{mark ? (
							<>
								<span><i class="fas fa-bookmark fa-5x" onClick={unmakr}></i></span>
							</>
					):
						(
							<>
								<span><i class="far fa-bookmark fa-5x" onClick={pmark}></i></span>
							</>
						)
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