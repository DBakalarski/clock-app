import { Nullable } from '../helpers/types';
import { IAdditionalData } from './TimeContainer';
import styled from 'styled-components';

interface IAdditionalInfo {
  data?: Nullable<IAdditionalData>;
  isVisible: boolean;
}

const AdditionalInfoBox = styled.div<IAdditionalInfo>`
  height: ${(props) => (props.isVisible ? 0 : '280px')};
  width: 100vw;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(5px);
  transition: 0.5s;
  @media (min-width: 768px) {
    height: ${(props) => (props.isVisible ? 0 : '416px')};
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 46px 28px;
  color: #303030;
  font-weight: 400;
  font-size: 10px;
  @media (min-width: 768px) {
    flex-direction: row;
    padding: 119px 64px 71px 64px;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 48px;
  }
`;

const ItemLabel = styled.span`
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 10px;
  @media (min-width: 768px) {
    letter-spacing: 2.6px;
    font-size: 13px;
  }
  @media (min-width: 1024px) {
    letter-spacing: 3px;
    font-size: 15px;
  }
`;

const ItemValue = styled.span`
  font-weight: 700;
  font-size: 20px;
  @media (min-width: 768px) {
    font-size: 40px;
  }
  @media (min-width: 1024px) {
    font-size: 56px;
  }
`;

const AdditionalInfo: React.FC<IAdditionalInfo> = (props) => {
  return (
    <AdditionalInfoBox isVisible={!props.isVisible}>
      <ItemsContainer>
        <Item>
          <ItemLabel>CURRENT TIMEZONE</ItemLabel>
          <ItemValue>{props.data?.timezone}</ItemValue>
        </Item>
        <Item>
          <ItemLabel>Day of the year</ItemLabel>
          <ItemValue>{props.data?.dayOfYear}</ItemValue>
        </Item>
        <Item>
          <ItemLabel>Day of the week</ItemLabel>
          <ItemValue>{props.data?.dayOfWeek}</ItemValue>
        </Item>
        <Item>
          <ItemLabel>Week number</ItemLabel>
          <ItemValue>{props.data?.weekNumber}</ItemValue>
        </Item>
      </ItemsContainer>
    </AdditionalInfoBox>
  );
};

export default AdditionalInfo;
