import React from 'react'
import { Statistic } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'


const EstatisticaVereador = (props) => (
  <div>
    <Divider horizontal>Solicitações</Divider>
    <Statistic.Group horizontal>
      <Statistic>
        <Statistic.Value>{props.dados.legislaturas.length}</Statistic.Value>
        <Statistic.Label>Anos de Legislaturas</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.dados.projetos.length}</Statistic.Value>
        <Statistic.Label>Projetos Apresentados</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.dados.indicacoes.length}</Statistic.Value>
        <Statistic.Label>Indicações</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  </div>
)

export default EstatisticaVereador