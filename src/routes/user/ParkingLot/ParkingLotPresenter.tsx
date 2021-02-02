import React from 'react';
import styled from 'styled-components';

import areaA from '../../../img/map_areaA.png'
import areaB from '../../../img/map_areaB.png'
import areaC from '../../../img/map_areaC.png'
import areaD from '../../../img/map_areaD.png'
import Template from "../../../components/templates/mobile";

const ParkingLotPresenter: React.FC<{ emptySpace: number[] }> = ({emptySpace}) => {
    return (
        <Template>
            <>
                <span id="space">현재 {} 대 주차가능 </span>
                <span id="waiting">┃ 평균 대기시간 {} 분</span>
                <Area>
                    <Areas className="areas">
                        <Text>
                            <div className="areaName A">A 구역</div>
                            <div className="numOfSpace">{emptySpace[0]}대 주차 가능</div>
                        </Text>
                        <Map>
                            <img src={areaA} alt="약도"/>
                        </Map>
                    </Areas>
                    <Areas>
                        <Text>
                            <div className="areaName B">B 구역</div>
                            <div className="numOfSpace">{emptySpace[1]}대 주차 가능</div>
                        </Text>
                        <Map>
                            <img src={areaB} alt="약도"/>
                        </Map>
                    </Areas>
                    <Areas>
                        <Text>
                            <div className="areaName C">C 구역</div>
                            <div className="numOfSpace">{emptySpace[2]}대 주차 가능</div>
                        </Text>
                        <Map>
                            <img src={areaC} alt="약도"/>
                        </Map>
                    </Areas>
                    <Areas>
                        <Text>
                            <div className="areaName D">D 구역</div>
                            <div className="numOfSpace">{emptySpace[3]}대 주차 가능</div>
                        </Text>
                        <Map>
                            <img src={areaD} alt="약도"/>
                        </Map>
                    </Areas>
                </Area>
            </>
        </Template>
    );
};

export default ParkingLotPresenter;

const Area = styled.div`
  margin-top: 20px;
`;
const Areas = styled.div`
  width: 400px;
  height: 150px;
  margin-bottom: 10px;
  border: 1px lightgray solid;
  padding: 15px;
`
const Text = styled.div`
  width: 180px;
  text-align: center;
  float: left;
`;

const Map = styled.span`
  width: 180px;

  img {
    width: 180px;
    height: 150px;
  }
`