import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;

  padding: 30px;
  background-color: #f5f5f5;
`;

export const Logo = styled.Image`
  margin-top: 30px;
`;

export const Empty = styled.Text`
  align-self: center;

  color: #999;
  font-size: 24px;
  font-weight: bold;
`;

export const CardsContainer = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;

  max-height: 500px;
`;

export const Card = styled.View`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  margin: 30px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 8px;
`;

export const Avatar = styled.Image`
  flex: 1;
  height: 300px;
`;

export const Footer = styled.View`
  background-color: #fff;
  padding: 15px 20px;
`;

export const Name = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

export const Bio = styled.Text`
  margin-top: 5px;
  line-height: 18px;
  color: #999;
  font-size: 14px;
  font-weight: bold;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;

export const Button = styled.TouchableOpacity.attrs({
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 2,
  shadowOffset: {
    width: 0,
    height: 2,
  },
})`
  justify-content: 'center';
  align-items: 'center';
  width: 50px;
  height: 50px;
  margin: 0 20px;
  border-radius: 25px;
  background-color: '#fff';
  elevation: 2;
`;

export const MatchContainer = styled.View`
  position: 'absolute';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.8);
`;

export const MatchImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 60px;
`;

export const MatchAvatar = styled.Image`
  width: 160px;
  height: 160px;
  margin: 30px 0;
  border-width: 5px;
  border-radius: 80px;
  border-color: #fff;
`;

export const MatchName = styled.Text`
  color: #fff;
  font-size: 26px;
  font-weight: bold;
`;

export const MatchBio = styled.Text`
  margin-top: 10px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  text-align: center;
`;

export const CloseMatch = styled.TouchableOpacity`
  margin-top: 30px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;
