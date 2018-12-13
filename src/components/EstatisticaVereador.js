import React from 'react'
import { Statistic } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'


const EstatisticaVereador = (props) => (
  <div>
    <Divider horizontal>Solicitações</Divider>
    <Statistic.Group widths='two'>
      <Statistic size='mini'>
        <Statistic.Label>Projetos</Statistic.Label>
        <Statistic.Value>{props.dados.projetos.quantidade}</Statistic.Value>
      </Statistic>    

      <Statistic size='mini'>
        <Statistic.Label>Indicações</Statistic.Label>
        <Statistic.Value>0</Statistic.Value>
      </Statistic>   
    </Statistic.Group>
  </div>
)

export default EstatisticaVereador