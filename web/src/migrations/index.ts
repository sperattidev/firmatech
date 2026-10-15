import * as migration_20261015_183747_inicial from './20261015_183747_inicial'

export const migrations = [
  {
    up: migration_20261015_183747_inicial.up,
    down: migration_20261015_183747_inicial.down,
    name: '20261015_183747_inicial',
  },
]
