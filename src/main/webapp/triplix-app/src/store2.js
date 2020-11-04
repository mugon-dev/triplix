const LIKE = 'LIKE';
export const glike = () => ({type: LIKE});
const UNLIKE = 'UNLIKE';
export const gunlike = () => ({type: UNLIKE});

const initstate2 = {
  isLike: false,
};


const reducer2 = (state2 = initstate2, action2) => {
  switch (action2.type) {
    case LIKE:
	  return { isLike: true };
	case UNLIKE:
      return { isLike: false };
    default:
      return state2;
  }
};

export default reducer2;