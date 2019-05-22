import React from 'react'
import { Card, Image, Icon, Divider } from 'semantic-ui-react'
import Moment from 'react-moment';
import 'moment-timezone';
import EstatisticaVereador from './EstatisticaVereador';

import { Link } from 'react-router-dom'

const formatData = (data) => (
  <Moment format="DD/MM/YYYY">
    {data}
  </Moment>
)

function DataAniversario(props) {
  const aniversario = props.data;
  if (aniversario) {
    return <span><Icon circular name='birthday' />{formatData(aniversario)}<br/></span>
  }
  return null
}

function DadosExtras(props) {
  let data = props.data;
  if (data.extra !== true) {
    return null;
  }
  return (
    <div>
      <Card.Content extra>
        <EstatisticaVereador dados={data.dados}></EstatisticaVereador>
      </Card.Content>
      <Divider horizontal>Informações</Divider>
      <Card.Content extra>
        <DataAniversario data={data.dados.data_nascimento} />
        <Icon circular name='mail' />{data.dados.email}<br/>
        <Icon circular name='phone' />{data.dados.telefone_gabinete}<br/>
      </Card.Content>
    </div>
  );
}

function GetLink(props) {
  let data = props.data;
  let url = '/vereadores/' + data.id + '/';
  return (
    <Link to={url}>
      {data.nome}
    </Link>
  );
}

const CardVereador = (props) => (
  <Card color='grey' key={props.dados.id}>
    <Image src={props.dados.foto} />
    <Card.Content>
      <Card.Header>
        <GetLink data={props.dados}></GetLink>
      </Card.Header>
      <Card.Meta>
        {props.dados.apelido}
      </Card.Meta>
    </Card.Content>
    <DadosExtras data={props}></DadosExtras>
  </Card>
)

export default CardVereador