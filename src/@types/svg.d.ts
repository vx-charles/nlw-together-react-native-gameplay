declare module "*.svg" { // sobrescreve as importações
  import React from "react" // usa o SVG como um componente
  import { SvgProps } from 'react-native-svg' // tipagem de props do SVG
  const content: React.FC<SvgProps> // FC - function component
  export default content // Faz o content tipado agora
}