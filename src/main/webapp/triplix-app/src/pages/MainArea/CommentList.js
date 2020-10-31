import React from 'react';
import {CommentBox} from './DetailStyle';
const CommentList = (props) => {
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