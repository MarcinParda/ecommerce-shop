import { FormValues } from 'interfaces';
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  defaultValues?: any;
}

export const Form = ({ defaultValues, children, onSubmit }: Props) => {
  const methods = useForm<FormValues>({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return React.isValidElement(child)
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};
