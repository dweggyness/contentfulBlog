import React from "react"
import styled, { keyframes } from "styled-components";
import { StarRating } from '.';

import { IoMdBeaker } from 'react-icons/io';
import { FaRegClock, FaWeightHanging, FaThermometerHalf } from 'react-icons/fa';

const DetailsInitialAnimation = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  grid-template-rows: 45px 40px 45px;
  
  animation: 0.55s ease-in ${DetailsInitialAnimation};
  animation-fill-mode: backwards;

  border-top: ${props => (`1px solid ${props.theme.textColor}`)};
  margin: 0 5px;
  box-shadow: 0 1px 2px #999;
`

const BrewingParamsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  grid-template-rows: 40px;

  animation: 0.55s ease-in 0.24s ${DetailsInitialAnimation};
  animation-fill-mode: backwards;

  margin: 0 5px;
  border: ${props => (`1px solid ${props.theme.textColor}`)}; 
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3px 6px;
`

const DetailTitle = styled.p`
  font-family: 'Raleway';
  font-weight: 300;
  font-size: 11px;
  margin: 0;
`

const DetailContent = styled(DetailTitle)`
  font-weight: 600;
  font-size: 13px;
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`

const BrewingDetailContent = styled(DetailContent)`
  display: flex;
  align-items: center;
`

const BrewingParamsTitle = styled.div`
  margin: 20px 0 2px 5px;
  animation: 0.55s ease-in 0.12s ${DetailsInitialAnimation};
  animation-fill-mode: backwards;
`

export default function TeaReviewPostDetails({ 
    color,
    bgColor,
    teaSource,
    teaType,
    teaName,
    teaPrice,
    teaRating,
    postCreationDate,
    brewingWaterAmount,
    brewingTemp,
    brewingTeaAmount,
    brewingTime
}) {
    const renderBrewingParams = brewingWaterAmount && brewingTemp && brewingTeaAmount && brewingTime
    return (
        <>
            <DetailsContainer>
                <Detail style={{ backgroundColor: bgColor, gridArea: '1 / 1 / 2 / 5' }}>
                <DetailTitle>Vendor</DetailTitle>
                <DetailContent>{teaSource}</DetailContent>
                </Detail>
                <Detail style={{ backgroundColor: bgColor, gridArea: '2 / 1 / 3 / 5' }}>
                <DetailTitle>Tea Name</DetailTitle>
                <DetailContent>{teaName}</DetailContent>
                </Detail>
                <Detail>
                <DetailTitle>Date</DetailTitle>
                <DetailContent>{postCreationDate}</DetailContent>
                </Detail>
                <Detail>
                <DetailTitle>Type</DetailTitle>
                <DetailContent>{teaType}</DetailContent>
                </Detail>
                <Detail>
                <DetailTitle>Price</DetailTitle>
                <DetailContent>{`RM${teaPrice} / g`}</DetailContent>
                </Detail>
                <Detail>
                <DetailTitle>Rating</DetailTitle>
                <DetailContent>
                    <StarRating rating={teaRating} color={color}/>
                </DetailContent>
                </Detail>
            </DetailsContainer>
            {renderBrewingParams && <><BrewingParamsTitle>
              Brewing Parameters
            </BrewingParamsTitle>
            <BrewingParamsContainer>
                <Detail>
                <DetailTitle>Water</DetailTitle>
                <BrewingDetailContent>
                    <IoMdBeaker style={{ marginRight: 3 }} color={color}/>{`${brewingWaterAmount}ml`}
                </BrewingDetailContent>
                </Detail>
                <Detail>
                <DetailTitle>Temperature</DetailTitle>
                <BrewingDetailContent>
                    <FaThermometerHalf style={{ marginRight: 3 }} color={color}/>{`${brewingTemp}°C`}
                </BrewingDetailContent>
                </Detail>
                <Detail>
                <DetailTitle>Tea Amount</DetailTitle>
                <BrewingDetailContent>
                    <FaWeightHanging style={{ marginRight: 3 }} color={color}/>{`${brewingTeaAmount}g`}
                </BrewingDetailContent>
                </Detail>
                <Detail>
                <DetailTitle>Time</DetailTitle>
                <BrewingDetailContent>
                    <FaRegClock style={{ marginRight: 3 }} color={color}/>{`${brewingTime}`}
                </BrewingDetailContent>
                </Detail>
            </BrewingParamsContainer></> }
        </>
    )
}