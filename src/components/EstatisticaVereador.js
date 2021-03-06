import React from 'react'
import { Statistic } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function GetLinkIndicacoes(props) {
  let data = props.data;
  let url = '/indicacoes/' + data.id + '/';
  return (
    <Link to={url}>
      Indicações
    </Link>
  );
}

const EstatisticaVereador = (props) => (
  <div>
    <Divider horizontal>Solicitações</Divider>
    <Statistic.Group horizontal>
      <Statistic>
        <Statistic.Value>{props.dados.legislaturas}</Statistic.Value>
        <Statistic.Label>Anos de Legislaturas</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.dados.projetos}</Statistic.Value>
        <Statistic.Label>Projetos Apresentados</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.dados.indicacoes}</Statistic.Value>
        <Statistic.Label>
          <GetLinkIndicacoes data={props.dados}></GetLinkIndicacoes>
        </Statistic.Label>
        <Statistic.Label style={label_indicacoes}>(A partir de 2018)</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  </div>
)

const label_indicacoes = {
  fontSize: '8px',
}

export default EstatisticaVereador
