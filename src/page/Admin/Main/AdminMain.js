import React, { useEffect, useState } from 'react';
import { getAdminLiveSituation } from '../../../api/admin';
import { initJanus } from '../../../modules/client';
import './admin_main.css';

const style = {
	display: 'inline-block',
	width: '100%',
};
/**
 * Main
 *
 * @todo api:: 현재 주차중 차 대수,평균 대기시간
 * @todo webRTC 구현
 */
const Main = () => {
	const [data, setData] = useState([]);
	const [sessinId, setSessionId] = useState('');

	useEffect(() => {
		getAdminLiveSituation(setData);
		initJanus();
	}, []);
	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<>
			<input type='text' onChange={(e) => {}} />
			<div className='status'>{`현재 ${data[0]}대 주차중 ${data[1]}대 평균 대기시간 4분 오늘 매출: ${data[2]}`}</div>
			<div style={style}>
				<div>
					<table className='camera'>
						<tr>
							<td className='video_label'>입차</td>
							<td className='video_label'>출차</td>
						</tr>
						<tr>
							<td className='video'>입차영상</td>
							<td className='video'>출차영상</td>
						</tr>
						<tr>
							<td className='video_label' colspan='2'>
								CCTV
							</td>
						</tr>
						<tr>
							<td id='dtd' className='video cctv' colspan='2'>
								주차장 영상
							</td>
						</tr>
					</table>
					<video id='myvideo'>test</video>
				</div>
			</div>
		</>
	);
};

export default Main;
