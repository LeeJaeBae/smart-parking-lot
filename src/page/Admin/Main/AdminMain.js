import React, { useEffect, useState } from 'react';
import { getAdminLiveSituation } from '../../../api/admin';
import { initJanus } from '../../../modules/client';
import publisher from '../../../modules/publisher';
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
		publisher();
	}, []);
	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<>
			<div className='status'>{`현재 ${data[0]}대 주차중 ${data[1]}대 평균 대기시간 4분 오늘 매출: ${data[2]}`}</div>
			<div style={style}>
				<div>
					<table className='camera'>
						<tr>
							<td className='video_label'>입차</td>
							<td className='video_label'>출차</td>
						</tr>
						<tr>
							<td className='video'>
								<video id='cctv1' autoPlay={true} playsInline={true} muted={'muted'}>
									test
								</video>
							</td>
							<td className='video'>
								<video id='cctv2' autoPlay={true} playsInline={true} muted={'muted'}>
									test
								</video>
							</td>
						</tr>
						<tr>
							<td className='video_label' colSpan='2'>
								CCTV
							</td>
						</tr>
						<tr>
							<td className='video cctv' colSpan='2'>
								<video id='myvideo' autoPlay={true} playsInline={true} muted={'muted'}>
									test
								</video>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</>
	);
};

export default Main;
