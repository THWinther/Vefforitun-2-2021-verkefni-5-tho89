import { render } from "react-dom";

// TODO sækja Sass
/* todo senda inn efni */
export function Layout({children}) {
  return(
    <div>
      <h1>Rúv Fréttir</h1>
      <div>{children}</div>
      <a href="https://www.ruv.is/">Fréttir frá Rúv</a>
    </div>
  ); 
}
