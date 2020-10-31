import React, { useState } from 'react';
import {CommentBox} from './DetailStyle';
const CommentList = (props) => {
	let comments = props.comment;
	

	console.log(comments,"asdf");
	return (
		<div>
			{comments.map((comment) => 
				<table>
					<tr>
						{/* <td><img src={comment.member.mimage}></img>{comment.member.mid} : {comment.comment}</td> */}
						<td>{comment.member.mid} : {comment.comment}</td>
					</tr>
				</table>
			)

			}
		</div>
	);
};

export default CommentList;