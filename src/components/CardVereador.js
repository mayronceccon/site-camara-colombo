import React from 'react'
import { Card, Image } from 'semantic-ui-react'
// import Moment from 'react-moment';
// import 'moment-timezone';
import EstatisticaVereador from './EstatisticaVereador';

// const formatData = (data) => (
//   <Moment format="DD/MM/YYYY">
//     {data}
//   </Moment>
// )

// function DataAniversario(props) {
//   const aniversario = props.data;
//   if (aniversario) {
//     return <span><Icon circular name='birthday' />{formatData(aniversario)}<br/></span>
//   }
//   return null
// }

// function Observacao(props) {
//   const observacao = props.observacao;
//   if (observacao) {
//     return <Card.Description>{observacao}</Card.Description>
//   }
//   return null
// }

const CardVereador = (props) => (
  <Card color='grey' key={props.dados.id}>
    <Image src={props.dados.foto} />
    <Card.Content>
      <Card.Header>{props.dados.nome}</Card.Header>
      <Card.Meta>
        {props.dados.apelido}
      </Card.Meta>
      {/* <Observacao observacao={props.dados.observacao}/> */}
      <EstatisticaVereador></EstatisticaVereador>
    </Card.Content>
    {/* <Card.Content extra>
      <DataAniversario data={props.dados.data_nascimento} />
      <Icon circular name='mail' />{props.dados.email}<br/>
      <Icon circular name='phone' />{props.dados.telefone_gabinete}<br/>
    </Card.Content> */}
  </Card>
)

export default CardVereador