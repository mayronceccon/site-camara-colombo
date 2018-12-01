import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import Moment from 'react-moment';
import 'moment-timezone';

const formatData = (data) => (
  <Moment format="DD/MM/YYYY">
    {data}
  </Moment>
)

const CardVereador = (props) => (
  <Card key={props.dados.id}>
    <Image src={props.dados.foto} />
    <Card.Content>
      <Card.Header>{props.dados.nome}</Card.Header>
      <Card.Meta>
        {props.dados.apelido}
      </Card.Meta>
      <Card.Description>{props.dados.observacao}</Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Icon circular name='birthday' /><span>{formatData(props.dados.data_nascimento)}</span><br/>
        <Icon circular name='mail' />{props.dados.email}<br/>
        <Icon circular name='phone' />{props.dados.telefone_gabinete}<br/>
    </Card.Content>
  </Card>
)

export default CardVereador