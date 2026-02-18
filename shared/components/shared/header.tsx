import React from 'react';
import {cn} from "@/lib/utils";
import {Button} from "@/shared/components/ui";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({className}) => {
  return (
    <header className={cn('', className)}>
      <h1 className="text-2xl">123</h1>
      <Button className=""/>
    </header>
  );
};