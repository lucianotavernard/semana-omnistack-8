import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: #f5f5f5;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  align-self: stretch;
  height: 46px;
  margin-top: 20px;
  padding: 0 15px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
  background-color: #fff;
`;

export const FormButtonSubmit = styled.TouchableOpacity`
  align-self: stretch;
  justify-content: center;
  align-items: center;
  height: 46px;
  margin-top: 10px;
  border-radius: 4px;
  background-color: #df4721;
`;

export const FormButtonTextSubmit = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
