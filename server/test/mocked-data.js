const { encrypt } = require("../utils/mk-crypto")

const organization = {
    // id: '',
    name: 'test org',
    key: 'test_org_key',
    plan_details: {},
    billing_details: {},
    modules_details: {},
    // created_at: '',
    // updated_at: '',
}

const organizationMember = (organizationId, roleId) => {
    return {
        user_id: '9945ecc7-1794-4b04-bbd1-1a52acecd3af',
        role_id: roleId,
        organization_id: organizationId,
        permission: 1
    }
}

const organizationMembers = (organizationId, roleId) => {
    return [
        {
        user_id: '9945ecc7-1794-4b04-bbd1-1a52acecd3af',
        organization_id: organizationId,
        role_id: roleId
        },
        {
        user_id: '0043f9f3-3738-415e-bb8f-a17d280f3be3',
        organization_id: organizationId,
        role_id: roleId
        },
        {
        user_id: '3c2e13e2-1189-4e82-9878-359a492512fc',
        organization_id: organizationId,
        role_id: roleId
        },
    ]
}

const roles = (organizationId) => {
    return [
        {
        name: 'test 1',
        organization_id: organizationId,
        },
        {
        name: 'test 2',
        organization_id: null,
        },
        {
        name: 'test 3',
        organization_id: organizationId,
        },
    ]
}

const projects = (organizationId) => {
    return [
        {
            name: 'test project 1',
            key: 'test_key_project_1',
            description: 'first test project for unit tests',
            color: 'red',
            organization_id: organizationId,
        },
        {
            name: 'test project 2',
            key: 'test_key_project_2',
            description: 'second test project for unit tests',
            color: 'red',
            organization_id: organizationId,
        }
    ]
}

const environments = (projectId) => {
    return [
        {
            name: 'test env 1',
            key: 'test_env_1',
            description: 'simple description',
            project_id: projectId,
            color: 'red',
            type: 3
        },
        {
            name: 'test env 2',
            key: 'test_env_2',
            description: 'simple description',
            project_id: projectId,
            color: 'red',
            type: 3
        }
    ]
}

const keys = async (projId, envId) => {
    return [
        {
            name: 'test key 1',
            key: 'test_key_1',
            secret: await encrypt('3c20444b-6865-4dfb-bfee-0a0b7279572b'),
            token: await encrypt('3c20444b-6865-4dfb-bfee-0a0b7279572b'),
            environment_id: envId,
            is_private: true,
            project_id: projId
        },
        {
            name: 'test key 2',
            key: 'test_key_2',
            secret: await encrypt('key_secret_2'),
            token: await encrypt('key_secret_2'),
            environment_id: envId,
            is_private: true,
            project_id: projId
        }
    ]
}

const services = (projectId) => {
    return  [
        {
            name: 'client',
            key: 'cli',
            description: 'simple description',
            color: 'red',
            project_id: projectId
        },
        {
            name: 'mailer',
            key: 'mai',
            description: 'simple description',
            color: 'red',
            project_id: projectId
        },
        {
            name: 'backend',
            key: 'bac',
            description: 'simple description',
            color: 'red',
            project_id: projectId
        },
    ]
}

const newProject = {
    name: 'test project 1',
    key: 'test_key_project_1',
    description: 'first test project for unit tests',
    color: 'red',
    environments: [
        {
            name: 'production',
            key: 'prod',
            description: 'simple description',
            color: 'red',
            type: 3
        },
        {
            name: 'test',
            key: 'test',
            description: 'simple description',
            color: 'red',
            type: 3
        },
        {
            name: 'stage',
            key: 'stg',
            description: 'simple description',
            color: 'red',
            type: 3
        },
    ],
    services: [
        {
            name: 'client',
            key: 'cli',
            description: 'simple description',
            color: 'red'
        },
        {
            name: 'mailer',
            key: 'mai',
            description: 'simple description',
            color: 'red'
        },
        {
            name: 'backend',
            key: 'bac',
            description: 'simple description',
            color: 'red'
        },
    ]
}

module.exports = {
    organization,
    organizationMember,
    organizationMembers,
    projects,
    environments,
    services,
    keys,
    roles,
    newProject,
}