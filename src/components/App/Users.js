import React from "react";
import { ApolloProvider, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { List, Button, Spin, message } from "antd";
import Popform from "../../components/Form/PopForm";

const client = new ApolloClient({
  uri: `http://localhost:3001/graphql`
});
const GET_USERS = gql`
  {
    allUsers {
      id
      name
      email
      password
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const CREATE_USERS = gql`
  mutation createUser($name: String!, $authProvider: AuthProviderSignupData!) {
    createUser(name: $name, authProvider: $authProvider) {
      id
      name
      email
      password
    }
  }
`;

const Loading = ({ loading, error }) => (
  <div>
    {loading && <Spin />}
    {error && message.error(":( Please try again")}
  </div>
);

const UserForm = ({ createUser }) => {
  const formSet = [
    {
      key: "name",
      label: "Name",
      required: true,
      message: "Please input the name!"
    },
    {
      key: "email",
      label: "Email",
      required: true,
      message: "Please input the email!"
    },
    {
      key: "password",
      label: "Password",
      required: true,
      message: "Please input the password!"
    }
  ];

  const dataProc = data => {
    const prams = {
      name: data.name,
      authProvider: {
        email: {
          email: data.email,
          password: data.password
        }
      }
    };
    createUser({ variables: prams });
  };
  return (
    <Popform
      formSet={formSet}
      buttonText="Add Users"
      modalTitle="Add Users"
      okText="Add"
      dataProc={dataProc}
    />
  );
};

const CreateUser = () => {
  return (
    <Mutation
      mutation={CREATE_USERS}
      update={(cache, { data: { createUser } }) => {
        const { allUsers } = cache.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: { allUsers: allUsers.concat([createUser]) }
        });
      }}
    >
      {(createUser, { loading, error }) => (
        <div>
          <UserForm createUser={createUser} />
          <Loading loading={loading} error={error} />
        </div>
      )}
    </Mutation>
  );
};

const DeleteUser = prams => (
  <Mutation
    mutation={DELETE_USER}
    update={(cache) => {
      const { allUsers } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { allUsers: allUsers.filter(val => val.id !== prams.id) }
      });
    }}
  >
    {(deleteUser, { loading, error }) => (
      <div>
        <Button type="danger" onClick={()=>deleteUser({variables:prams})}>
          Delete
        </Button>
        <Loading loading={loading} error={error} />
      </div>
    )}
  </Mutation>
);

const Users = () => (
  <Query query={GET_USERS}>
    {({ loading, error, data }) => {
      return (
        <div>
          <Loading loading={loading} error={error} />
          <List
            itemLayout="horizontal"
            dataSource={data && data.allUsers}
            renderItem={item => (
              <List.Item actions={[<DeleteUser id={item.id} />]}>
                <List.Item.Meta title={item.name} description={item.email} />
                {item.password}
              </List.Item>
            )}
          />
        </div>
      );
    }}
  </Query>
);

const UsersPanel = ({ createUser }) => {
  return (
    <ApolloProvider client={client}>
      <div>
        <CreateUser />
        <Users />
      </div>
    </ApolloProvider>
  );
};
export default UsersPanel;
