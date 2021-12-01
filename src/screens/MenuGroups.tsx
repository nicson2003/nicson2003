import React, {FC, useState, useEffect} from 'react';
import { Form, Radio } from 'semantic-ui-react'

import { Menus } from "../common/menu.interface";

export interface menuOptionProps {
  groups: Menus[] | undefined;
  onChange: (diet: Menus, opt: number) => void;
  opt: number;
  rules?: Number[];
  preSelection?: Menus | undefined
}

const GroupMenus: FC<menuOptionProps> = ({
  groups,
  onChange,
  opt,
  rules,
  preSelection
}) => {

  const [selected, setSelected] = useState<Menus>();

  useEffect(() => {
    selected && onChange(selected, opt)
    if (opt === 2) {
      //console.log(groups)
      //console.log("rules->MenuGroups", rules);
    }
  }, [selected, opt])


  const isRestricted = (id: number) => {
    if (Boolean(rules) && Boolean(preSelection)) {
      return rules?.some((i: Number) => i === id)      
    } else return false;
  }

  return (
    <Form>
      {
        groups && groups?.map((group: Menus, index: number) => {
          return !isRestricted(group.id) ? (
            <Form.Field key={`${index}-${group.id}`}>
              <Radio
                label={group.value}
                name='radioGroup'
                value={group.id}
                checked={selected?.id === group.id}
                onChange={() =>setSelected(group)}
                disabled = {Boolean(opt) && !Boolean(preSelection)}
              />
            </Form.Field>
          ): null
        })
      }
    </Form>
    
  )
}


export default GroupMenus;
