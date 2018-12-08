import React from 'react'
import { Statistic } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'


const EstatisticaVereador = () => (
  <Statistic.Group widths='two'>
    <Divider horizontal>Solicitações</Divider>
    <Statistic size='mini'>
      <Statistic.Label>Projetos</Statistic.Label>
      <Statistic.Value>0</Statistic.Value>
    </Statistic>    

    <Statistic size='mini'>
      <Statistic.Label>Indicações</Statistic.Label>
      <Statistic.Value>0</Statistic.Value>
    </Statistic>   
  </Statistic.Group>
)

export default EstatisticaVereador