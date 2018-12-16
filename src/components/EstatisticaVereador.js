import React from 'react'
import { Statistic } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'


const EstatisticaVereador = (props) => (
  <div>
    <Divider horizontal>Solicitações</Divider>
    <Statistic.Group horizontal>
      <Statistic>
        <Statistic.Value>{props.dados.legislaturas.quantidade}</Statistic.Value>
        <Statistic.Label>Anos de Legislaturas</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.dados.projetos.quantidade}</Statistic.Value>
        <Statistic.Label>Projetos Apresentados</Statistic.Label>
      </Statistic>
      {/* <Statistic>
        <Statistic.Value>X</Statistic.Value>
        <Statistic.Label>Indicações</Statistic.Label>
      </Statistic> */}
    </Statistic.Group>
  </div>
)

export default EstatisticaVereador