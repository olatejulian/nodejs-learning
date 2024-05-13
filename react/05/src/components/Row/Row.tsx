
type RowProps = {
  items: string[][]
}

function Row(props: RowProps){
  const items = props.items

  const mapper = (item: string) => {
    const dictionary = {
      L1: "",
      L2: "",
      R1: "",
      R2: "",
      x: "",
      quadrado: "",
      "triângulo": "",
      bolinha: "",
      up: "",
      left: "",
      right: "",
      down: ""
    }


  }

  items.map(cheat => ({name: cheat[0], cheatCode: cheat}))

}

export default Row
