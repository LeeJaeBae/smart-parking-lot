import React , { useState , useEffect, useRef } from 'react';

const SearchPreview = ( { numberPlate , entryTime } ) => {

	const handleAutoCompleteSearchWord = () => {
		// 검색어를 선택한 div의 numberPlate로 업데이트
		console.log(numberPlate);
	}
    // var renderResults = results.map(({ position, name, age }, index) => {}

	const handleCompleteSearchText = (e) => {
	}

	return (
		<>
		<div className='auto_search_box' onClick={handleAutoCompleteSearchWord}>
			<span className='auto_numberPlate'>
				{numberPlate}
			</span>
			<span className='auto_entrytime'>
				{entryTime}
			</span>
		</div>
		</>
	)
}

export default SearchPreview;