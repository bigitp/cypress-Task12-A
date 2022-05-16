/// <reference types="Cypress" />
const dataJson = require('../fixtures/createuser')


describe('post user request', () => {
    let accessToken = '804349b464821ae8f8071ba9aa05237a204b4f74d29c0a3821fee5dd4f256ff8'
    let randomText = ""
    let testEmail = ""
    it.only('create user test', () => {
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'

        cy.fixture('createuser').then((payload) => {

            //1. create user (POST)
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/users',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    "name": payload.name,
                    "gender": payload.gender,
                    "email": testEmail,
                    "status": payload.status
                }
            }).then((res) => {

                cy.log(JSON.stringify(res.body))
                expect(res.status).to.eq(201)
                expect(res.body).has.property('email', testEmail)
                expect(res.body).has.property('name', payload.name)
                expect(res.body).has.property('status', payload.status)
                expect(res.body).has.property('gender', payload.gender)
            })
        })
    })
})


describe('post user request', () => {
    let accessToken = '804349b464821ae8f8071ba9aa05237a204b4f74d29c0a3821fee5dd4f256ff8'
    let randomText = ""
    let testEmail = ""
    let testEmailUpd = ""


    it.only('create user test', () => {
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'
        testEmailUpd = testEmail + 'u'

        //1. create user (POST)
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                "name": "Test Automation Cypress",
                "gender": "male",
                "email": testEmail,
                "status": "active"
            }

        }).then((res) => {
            // cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email', testEmail)
            expect(res.body.data).has.property('name', 'Test Automation Cypress')
            expect(res.body.data).has.property('status', 'active')
            expect(res.body.data).has.property('gender', 'male')
        }).then((res) => {
            const userId = res.body.data.id
            cy.log("user id is: " + userId)
            //2. update user (PUT)
            cy.request({
                method: 'PUT',
                url: 'https://gorest.co.in/public/v1/users/' + userId,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    "name": "Test Automation Cypress Updated",
                    "gender": "male",
                    "email": testEmailUpd,
                    "status": "inactive"
                }
            }).then((res) => {
                cy.log(JSON.stringify(res.body))
                expect(res.status).to.eq(200)
                expect(res.body.data).has.property('email', testEmailUpd)
                expect(res.body.data).has.property('name', 'Test Automation Cypress Updated')
                expect(res.body.data).has.property('status', 'inactive')
                expect(res.body.data).has.property('gender', 'male')
            })
        })
    })
})


describe('post user request', () => {
    let accessToken = '804349b464821ae8f8071ba9aa05237a204b4f74d29c0a3821fee5dd4f256ff8'
    let randomText = ""
    let testEmail = ""
    let testEmailUpd = ""


    it.only('create user test', () => {
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'
        testEmailUpd = testEmail + 'u'

        //1. create user (POST)
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                "name": "Test Automation Cypress",
                "gender": "male",
                "email": testEmail,
                "status": "active"
            }

        }).then((res) => {
            // cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email', testEmail)
            expect(res.body.data).has.property('name', 'Test Automation Cypress')

        }).then((res) => {
            const userId = res.body.data.id
            cy.log("user id is: " + userId)
            //2. delete user (DELETE)
            cy.request({
                method: 'DELETE',
                url: 'https://gorest.co.in/public/v1/users/' + userId,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then((res) => {
                cy.log(JSON.stringify(res.body))
                expect(res.status).to.eq(204)

            })
        })
    })
})

