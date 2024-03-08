import styled from 'styled-components';

export const ProductDetailHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2px;
  background-color:  rgb(141, 166, 189);

  svg {
    font-size: 30px;
    color: white;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
  }

  label {
    margin: 5px;
    text-align: center;
    align-items:center;
    justify-content: center;
    border-radius: 5px;
    background-color: #fff;
    color:rgb(141, 166, 189);
    font-size: 25px;
  }
`;

export const ContainerTamanhos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:rgb(141, 166, 189);
  height: 70px;  
`;

export const TamanhoBox = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  background-color: white;
  border-radius: 10%;
  height: 30px;
  width: 30px;
  text-align: center;
  justify-content: center;

  span{
    padding-bottom: 25px;
  }
  
`;

export const TamanhoCircle = styled.div`
  width: 22px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid;
  border-color: #ccc;
  background-color: #fff;
  margin-bottom: 5px;
  margin-left: 20px;
`;

export const ContainerThumbs = styled.div`
  img{
    width: 40px;
    height: 40px;
    border: 1px solid #7f7c7c;
    border-radius: 2px;
    margin: 2px;
    cursor: pointer;
    transition: border-color 0.3s ease;
  }

`
export const TextInfo = styled.div`

a{
  font-weight: bold;
}`

export const HeaderInfo = styled.div`
  background-color: rgb(141, 166, 189);
  color:white;
  display: flex;
  flex-direction: row; 
  justify-content: center;
  position: relative;
  font-size: x-large;
`

export const ContainerImageCarousel = styled.div`
  display: 'flex',
  flex-direction: 'column',
  align-items: 'center',
  justify-content: 'flex-end',
  position: 'relative',
  background-color: '#ccc'
  
  svg{
    gap:10px;
    padding-right: 14px;
    font-size: 10px;
  }
`
export const ContainerCarrinho = styled.div`
  width: auto;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  input{
    width: 15px;
  }
`

