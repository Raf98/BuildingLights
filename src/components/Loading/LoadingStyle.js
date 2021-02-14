import styled from 'styled-components';

export default styled.div`
main{
  margin-top: 250px;
  font-family: 'Mono';
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes change-color {
  0%   {color:black;}
  50%  {color:yellow;}
  100%  {color:black;}
}

#dot1{
  font-size: 70px;
  animation-name: change-color;
  animation-duration: 1s;
  animation-iteration-count: 3;
}
#dot2{
  font-size: 70px;
  animation-name: change-color;
  animation-duration: 1s;
  animation-iteration-count: 3;
  animation-delay: 0.33s;
}
#dot3{
  font-size: 70px;
  animation-name: change-color;
  animation-duration: 1s;
  animation-iteration-count: 3;
  animation-delay: 0.67s;
}
`