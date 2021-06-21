import React, { useEffect, useState } from 'react';
import { getAdminLiveSituation } from '../../../api/admin';
import { initJanus } from '../../../modules/client';
import { io } from 'socket.io-client';
import publisher from '../../../modules/publisher';
import './admin_main.css';

const socket = io('http://52.79.82.77:50005');

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
	const [mediaStream, setMediaStream] = useState(undefined);

	useEffect(() => {
		getAdminLiveSituation(setData);
		// initJanus();
		// publisher();
		socket.emit('join', 'test');
		socket.on('streaming', (data) => {
			const byteChars = atob(data);
			// console.log(byte_chars);
			const byteNumbers = new Array(byteChars.length);
			for (let i = 0; i < byteChars.length; i++) {
				byteNumbers[i] = byteChars.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			const blob = new Blob([byteArray], { type: 'image/png' });
			setMediaStream(URL.createObjectURL(blob));
		});
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
								<img
									alt=''
									id='video'
									width='500'
									height='360'
									src={mediaStream}
									style={{ border: 'solid 1px black' }}
								/>
							</td>
							<td className='video'>
								<img
									alt=''
									id='video'
									width='500'
									height='360'
									src={mediaStream}
									style={{ border: 'solid 1px black' }}
								/>
							</td>
						</tr>
						<tr>
							<td className='video_label' colSpan='2'>
								CCTV
							</td>
						</tr>
						<tr>
							<td className='video cctv' colSpan='2'>
								<img
									alt=''
									id='video'
									width='1024'
									height='720'
									src={mediaStream}
									style={{ border: 'solid 1px black' }}
								/>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</>
	);
};

export default Main;
