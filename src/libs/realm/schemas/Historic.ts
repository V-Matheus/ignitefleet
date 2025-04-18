import { Realm } from '@realm/react';

export class Historic extends Realm.Object<Historic> {
  static generate() {}

  static schema = {
    name: 'Historic',
    primaryKey: 'id',

    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true,
      },
      license_plate: 'string',
      description: 'string',
      status: 'string',
      created_at: 'date',
      update_at: 'date',
    },
  };
}
