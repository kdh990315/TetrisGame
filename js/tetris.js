const playground = document.querySelector('.playground > ul');


//Game Setting 
const Game_Rows = 20;
const Game_Cols = 10;

//변수
const BLOCKS = {
	T_BLOCKS: [
		[[0, 1], [1, 0], [1, 1], [2, 1]],
		[],
		[],
		[],
	]
}

let score = 0,
	TimeToFall = 500,
	downInterval,
	tempMovingItem;

const movingItem = {
		//떨어지는 블록의 정보
		type: 'T_BLOCKS',
		direction: 0,
		top: 0,
		left: 0,

	};




//함수
const init = () => {
	//떨어지는 블록의 초기 정보를 임시저장해두는 용도
	tempMovingItem = {...movingItem};

	for(let i = 0; i < Game_Rows; i++) {
		addtetrisBox();
	}
	renderBlocks();

}

const addtetrisBox = () => {
	const li = document.createElement('li');
	const ul = document.createElement('ul');
	for(let j = 0; j < Game_Cols; j++) {
		const tetrisBox = document.createElement('li');

		ul.prepend(tetrisBox);
	}
	li.prepend(ul);
	playground.prepend(li);
}

const renderBlocks = () => {
	const {type, direction, top, left} = tempMovingItem;
	//arr Destructuring을 사용하여 하나하나의 값에 접근하지 말고 변수처럼 배열값을 사용한다.

	BLOCKS[type][direction].forEach(BLOCK => {
		const x = BLOCK[0];
		const y = BLOCK[1];

		const BLOCK_target = playground.childNodes[y].childNodes[0].childNodes[x];
		//childNodes에 접근하면 자식요소를 배열로 나타내어 set()이나 foreach등으로 접근할 수 있다.
		//콘솔에 찍을 때 일반 괄호로는 안되고 ({})로 접근해야하는듯?
		console.log( {playground} )
		BLOCK_target.classList.add(type);

	});
	console.log(BLOCKS[type][direction])
}

init();