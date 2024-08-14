const request = require('supertest');
const db = require('./models')
const Umzug = require("umzug");
const jwt = require('jsonwebtoken');
const { MEMBER, OWNER } = require('./enums/roles');
async function login(app, params) {
    const response = await  request(app)
                        .post("/login")
                        .send(params)
    return response.headers['set-cookie']
}

function prepareAndCleanDB (migrations, callback, doBeforeEach = true) {
        if (doBeforeEach) {

            beforeEach(async () => {
               
                await db.sequelize
                  .getQueryInterface()
                  .dropAllTables();
        
                const umzug = new Umzug({
                migrations: {
                params: [ db.sequelize.getQueryInterface(), db.Sequelize ],
                path: "migrations"
                },
                storage: "sequelize",
                storageOptions: {
                sequelize: db.sequelize
                },
                logging: console.log
                });
        
                // TODO get all migration name programmatically
                await umzug.execute({
                migrations: migrations,
                method: "up"
                })
                if (callback) {
                    result = await callback()
                }
    
                // done()
                
            })
        
        } else {

            beforeAll(async () => {
               
                await db.sequelize
                  .getQueryInterface()
                  .dropAllTables();
        
                const umzug = new Umzug({
                migrations: {
                params: [ db.sequelize.getQueryInterface(), db.Sequelize ],
                path: "migrations"
                },
                storage: "sequelize",
                storageOptions: {
                sequelize: db.sequelize
                },
                logging: console.log
                });
        
                // TODO get all migration name programmatically
                await umzug.execute({
                migrations: migrations,
                method: "up"
                })
                if (callback) {
                    result = await callback()
                }
    
                // done()
                
            })
        
        }
        afterAll(async () => {
            await db.sequelize.close()
        })
}

function testAuthAPI(app, name){
    it('should response 401 the GET method', () => {
        return request(app)
        .get(name)
        .then(response => {
            expect(response.statusCode).toBe(401)
        })
    });

    it('should response 200 the GET method', async () => {
        const cookie = await login(app,{username: 'chaim', password: '123456'})
        
        return request(app)
        .get(name)
        .set('Cookie', cookie)
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
    });
}

function removeField(obj, field) {
    return Object.keys(obj).filter(k=>k!==field).reduce((a,k)=>Object.assign(a,{[k]: obj[k]}),{})
}

const jwtToken = async () => {
    return jwt.sign({ id: '9945ecc7-1794-4b04-bbd1-1a52acecd3af'}, process.env.JWT_SECRET, { expiresIn: '24h'})
}

const  createMember = async (orgId) => {
    
    const role = await db.Role.findOne({where: {name: MEMBER}})
    const member = await db.OrganizationMember.create({
        organization_id: orgId,
        role_id: role.id,
        user_id: '9945ecc7-1794-4b04-bbd1-1a52acecd3af'
    })
    return member;
} 
const  createOwner = async (orgId) => {
    
    const role = await db.Role.findOne({where: {name: OWNER}})
    const member = await db.OrganizationMember.create({
        organization_id: orgId,
        role_id: role.id,
        user_id: '9945ecc7-1794-4b04-bbd1-1a52acecd3af'
    })
    return member;
} 

permissionFields = [
    '20220710060218-create_roles.js',
    '20220607102411-create-projects-members',
    '20220710060219-create_invitations.js',
    '20220710064500-change_member_permission_to_role',
    '20220802081443-create_permissions.js',
    '20220802081444-create_permissions_roles.js',
    '20220802081448-add-index-to-organizatioin-role.js',
    '20220803120738-add-last-update-timestamp.js',
    '20220803144031-change_roles_name.js'
]

module.exports.login = login
module.exports.prepareAndCleanDB = prepareAndCleanDB
module.exports.testAuthAPI = testAuthAPI
module.exports.removeField = removeField
module.exports.jwtToken = jwtToken
module.exports.permissionFields = permissionFields
module.exports.createMember = createMember
module.exports.createOwner = createOwner