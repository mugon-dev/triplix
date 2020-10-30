import React from 'react';
import {CommentBox} from './DetailStyle';
const CommentList = (props) => {
	//let title = "tttt";
	console.log("시시ㅓ아ㅓ아  : " , props.comment);
	let comments = props.comment;
	console.log(comments);
	return (
		<div>
			{comments.map((comment) => 
				<table>
					<tr>
						<td>{comment.comment}</td>
					</tr>
				</table>
			)

			}
		</div>
	);
};

export default CommentList;