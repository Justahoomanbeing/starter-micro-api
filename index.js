(async () => {
    // default imports
    const events = require('events');
    const {
        exec
    } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const {
        MessageEmbed,
        MessageButton,
        MessageActionRow,
        Intents,
        Permissions,
        MessageSelectMenu
    } = require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    let URL = require('url')
    const ms = require("ms")
    let https = require("https")
    const Database = require("easy-json-database")

    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire: null,
        joiningMember: null,
        reply: null,
        player: null,
        manager: null,
        Inviter: null,
        message: null,
        notifer: null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
        let file = JSON.parse(fs.readFileSync('package.json'))
        file.dependencies['discord.js'] = '^13.16.0'
        fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
        exec('npm i')
        throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.16.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
        let file = JSON.parse(fs.readFileSync('package.json'))
        file.dependencies['discord-logs'] = '^2.0.0'
        fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
        exec('npm i')
        throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION",
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function(err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code


    // blockly code
    var deleted_message_info, edited_msg_info, snipe_database, editsnipe_database, response, temp;



    function colourRandom() {
        var num = Math.floor(Math.random() * Math.pow(2, 24));
        return '#' + ('00000' + num.toString(16)).substr(-6);
    }

    function listsGetRandomItem(list, remove) {
        var x = Math.floor(Math.random() * list.length);
        if (remove) {
            return list.splice(x, 1)[0];
        } else {
            return list[x];
        }
    }


    await s4d.client.login('TOKEN').catch((e) => {
        const tokenInvalid = true;
        const tokenError = e;
        if (e.toString().toLowerCase().includes("token")) {
            throw new Error("An invalid bot token was provided!")
        } else {
            throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
        }
    });

var http = require('http');
http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Yo!');
    res.end();
}).listen(process.env.PORT || 3000);

    s4d.client.on('ready', async () => {
        s4d.client.user.setPresence({
            status: "dnd",
            activities: [{
                name: 'peyara\'s SHINEY chandi',
                type: "WATCHING"
            }]
        });


    });

  const database1 = new Database('./database.json')
    const database2 = new Database('./database2.json')
  
    s4d.client.on('messageDelete', async (s4dmessage) => {
        if ((s4dmessage.author).bot) {} else {
            if (String(((s4dmessage.content).toLowerCase())).includes(String('sniped something'))) {} else {
                if (String(((s4dmessage.content).toLowerCase())).includes(String('u thought'))) {} else {
                    deleted_message_info = [(s4dmessage.member.user).id, s4dmessage.content];
                    database1.set(String((String((s4dmessage.channel).id) + '-snipe')), deleted_message_info);
                }
            }
        }

    });
  
  s4d.client.on('messageCreate', async (s4dmessage) => {
      try {
            if ((((s4dmessage.content).toLowerCase()) || '').endsWith('!snipe' || '')) {
              snipe_database = database1.get(String((String((s4dmessage.channel).id) + '-snipe')));
              var heheboi = new Discord.MessageEmbed();
              heheboi.setColor((colourRandom()));
              heheboi.setFooter({
                  text: String('he thought he could escape'),
                  iconURL: String()
              });
                    heheboi.setAuthor(String((String((s4d.client.users.cache.get(String((snipe_database[0])))).username))), String(((s4d.client.users.cache.get(String((snipe_database[0])))).displayAvatarURL({
                      format: "png"
              }))), String());
              heheboi.setDescription(String((snipe_database[1])));
              heheboi.setTimestamp(new Date());
              s4dmessage.channel.send({
                  embeds: [heheboi]
              });


          }

      } catch (err) {
          s4dmessage.channel.send({
              content: String('couldnt find a deleted msg')
          });

      }
  });
  
  s4d.client.on('messageUpdate', async (oldMessage, newMessage) => {
      s4dmessage = newMessage
      edited_msg_info = [s4dmessage.member.id, oldMessage.content, newMessage.content];
      database2.set(String((String((newMessage.channel).id) + '-editsnipe')), edited_msg_info);

  });

  s4d.client.on('messageCreate', async (s4dmessage) => {
    try {
      if (((s4dmessage.content) || '').endsWith('!editsnipe' || '')) {
            editsnipe_database = database2.get(String((String((s4dmessage.channel).id) + '-editsnipe')));
            var hehehe = new Discord.MessageEmbed();
            hehehe.setColor((colourRandom()));
            hehehe.setFooter({
                text: String('lol imagine typo'),
                iconURL: String()
            });
              hehehe.setAuthor(String((String((s4d.client.users.cache.get(String((editsnipe_database[0])))).username))), String(((s4d.client.users.cache.get(String((editsnipe_database[0])))).displayAvatarURL({
                format: "png"
            }))), String());
        hehehe.setDescription(String(([`**Before**
        `, editsnipe_database[1], `

        **After**
        `, editsnipe_database[2]].join(''))));
            hehehe.setTimestamp(new Date());
            s4dmessage.channel.send({
                embeds: [hehehe]
            });


          }

      } catch (err) {
          s4dmessage.channel.send({
              content: String('couldnt find an edited msg')
          });

      }
  });
  
s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'syllabus') {
        var syllabus = new Discord.MessageEmbed();
           syllabus.setColor((colourRandom()));
          syllabus.setTitle(String('WHY'))
           syllabus.setURL(String());
          syllabus.setDescription(String(`
wtf? u still wanna studay? <:areuserious:1178308197442932806>`));
  syllabus.setFooter({text: String('oh hell naw u gon crazyyy'), iconURL: String()});
    
        await interaction.reply({embeds: [syllabus], ephemeral: false, components: [] });
      }
    
        });
        

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (((s4dmessage.content) || '').startsWith('syupdate' || '')) {
            s4dmessage.delete();
        }

    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (s4dmessage.author.bot) {
            return;
        }
        if (((s4dmessage.content) || '').startsWith('!timeout' || '')) {
            if ((s4dmessage.member).permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                try {
                    if ((s4dmessage.mentions.members.first()) != null) {
                        (s4dmessage.channel).send(String('time? (in seconds)')).then(() => {
                            (s4dmessage.channel).awaitMessages({
                                filter: (m) => m.author.id === (s4dmessage.author).id,
                                time: (5 * 60 * 1000),
                                max: 1
                            }).then(async (collected) => {
                                s4d.reply = collected.first().content;
                                s4d.message = collected.first();
                                temp = (s4d.reply);
                                if (temp % 2 === 0 || temp % 2 === 1) {
                                    s4dmessage.channel.send({
                                        content: String(([s4dmessage.mentions.members.first(), ' bozo got cockblocked for ', temp, ' seconds lmao '].join('')))
                                    });
                                    (s4dmessage.mentions.members.first()).send({
                                        content: String((['you got timeout\'d ', (s4dmessage.guild).name, ' by ', (s4dmessage.author).tag, ' for ', temp, ' seconds '].join('')))
                                    });
                                    s4dmessage.mentions.members.first().timeout((temp * 1000), [s4dmessage.mentions.members.first(), 'is dead', s4dmessage.author, 'for ', temp, ' seconds.'].join(''))
                                } else {
                                    s4dmessage.channel.send({
                                        content: String((String(s4dmessage.mentions.members.first()) + ' go to class 1 and ask ur wife what are numbers'))
                                    });
                                }

                                s4d.reply = null;
                            }).catch(async (e) => {
                                console.error(e);
                                s4dmessage.channel.send({
                                    content: String((String(s4dmessage.mentions.members.first()) + 'try again bozo'))
                                });
                            });
                        })
                    } else {
                        s4dmessage.channel.send({
                            content: String((String(s4dmessage.author) + ' they dont exist? :face_with_raised_eyebrow:  '))
                        });
                    }

                } catch (err) {
                    s4dmessage.channel.send({
                        content: String((String(s4dmessage.author) + ' they dont exist? :face_with_raised_eyebrow:  '))
                    });

                }
            } else {
                s4dmessage.channel.send({
                    content: String((String(s4dmessage.author) + ' hey you boy u rly thought ur gonna outsmart me?'))
                });
                s4dmessage.channel.send({
                    content: String('||u dont have permissions to timeout, xd||')
                });
            }
        }

    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (s4dmessage.author.bot) {
            return;
        }
        if (((s4dmessage.content) || '').startsWith('!kick' || '')) {
            if ((s4dmessage.member).permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                try {
                    if ((s4dmessage.mentions.members.first()) != null) {
                        s4dmessage.channel.send({
                            content: String(([s4dmessage.mentions.members.first(), ' was kicked in the ass by ', s4dmessage.author, ' :hehehahaw_murgi: '].join('')))
                        });
                        (s4dmessage.mentions.members.first()).send({
                            content: String((['u just got kicked from milestone dogshit >:) ', (s4dmessage.guild).name, ' by ', (s4dmessage.author).tag, ' hehe '].join('')))
                        });
                        (s4dmessage.mentions.members.first()).kick({
                            reason: ([s4dmessage.mentions.members.first(), 'was kicked in the ass by', s4dmessage.author, ':hehehahaw_murgi:'].join(''))
                        });
                    } else {
                        s4dmessage.channel.send({
                            content: String((String(s4dmessage.author) + ' who tf are u kicking '))
                        });
                    }

                } catch (err) {
                    s4dmessage.channel.send({
                        content: String((String(s4dmessage.author) + ' who tf are u kicking '))
                    });

                }
            } else {
                s4dmessage.channel.send({
                    content: String((String(s4dmessage.author) + 'Hey u boy, why are u outside the class im calling ur form teacher'))
                });
                s4dmessage.channel.send({
                    content: String('||u dont have permissions to kick, LOL||')
                });
            }
        }

    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (s4dmessage.author.bot) {
            return;
        }
        if (((s4dmessage.content) || '').startsWith('!ban' || '')) {
            if ((s4dmessage.member).permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                try {
                    if ((s4dmessage.mentions.members.first()) != null) {
                        s4dmessage.channel.send({
                            content: String(([s4dmessage.mentions.members.first(), ' was sent to get milk by ', s4dmessage.author, ' :ayhay_kalo:'].join('')))
                        });
                        (s4dmessage.mentions.members.first()).send({
                            content: String((['ur banned from milestone dogshit >:) ', (s4dmessage.guild).name, ' by ', (s4dmessage.author).tag, ' hehe '].join('')))
                        });
                        (s4dmessage.mentions.members.first()).ban({
                            reason: ([s4dmessage.mentions.members.first(), ' was sent to get milk by ', s4dmessage.author, ' :ayhay_kalo:'].join(''))
                        });
                    } else {
                        s4dmessage.channel.send({
                            content: String((String(s4dmessage.author) + ' who tf are u banning '))
                        });
                    }

                } catch (err) {
                    s4dmessage.channel.send({
                        content: String((String(s4dmessage.author) + ' who tf are u banning '))
                    });

                }
            } else {
                s4dmessage.channel.send({
                    content: String((String(s4dmessage.author) + 'Hey u boy, why is ur hair so long, amin sir please cut their hair'))
                });
                s4dmessage.channel.send({
                    content: String('||u dont have permissions to ban, LOL||')
                });
            }
        }

    });

  s4d.client.on('messageCreate', async (s4dmessage) => {
      if (String(((s4dmessage.content).toLowerCase())).includes(String('surujit'))) {
          response = ['hey u boy come here write statement', 'im calling your parents', 'hey u boy where is ur uniform why did farhad let u in', 'come here hold your ear stupid', 'hey u stupid come here, who gave u permission to call me by my name', 'hey you boy ur going to get suspended for 3 days', 'thats it u are getting transferred to other branch', 'im taking u to vp sir', 'how dare u', '*slaps*', 'what did u just say', 'amin sir pls bring my stick', 'hey you boy i heard you', 'hey you boy look at the board', 'you are coming with me', 'hey boy how do you talk'];
          s4dmessage.channel.send((listsGetRandomItem(response, false)));
      }

  });

  s4d.client.on('messageCreate', async (s4dmessage) => {
      if (String(((s4dmessage.content).toLowerCase())).includes(String('Shuorujit'))) {
          response = ['hey u boy come here write statement', 'im calling your parents', 'hey u boy where is ur uniform why did farhad let u in', 'come here hold your ear stupid', 'hey u stupid come here, who gave u permission to call me by my name', 'hey you boy ur going to get suspended for 3 days', 'thats it u are getting transferred to other branch', 'im taking u to vp sir', 'how dare u', '*slaps*', 'what did u just say', 'amin sir pls bring my stick', 'hey you boy i heard you', 'hey you boy look at the board', 'you are coming with me', 'hey boy how do you talk'];
          s4dmessage.channel.send((listsGetRandomItem(response, false)));
      }

  });

  s4d.client.on('messageCreate', async (s4dmessage) => {
      if (String(((s4dmessage.content).toLowerCase())).includes(String('Surajit'))) {
          response = ['hey u boy come here write statement', 'im calling your parents', 'hey u boy where is ur uniform why did farhad let u in', 'come here hold your ear stupid', 'hey u stupid come here, who gave u permission to call me by my name', 'hey you boy ur going to get suspended for 3 days', 'thats it u are getting transferred to other branch', 'im taking u to vp sir', 'how dare u', '*slaps*', 'what did u just say', 'amin sir pls bring my stick', 'hey you boy i heard you', 'hey you boy look at the board', 'you are coming with me', 'hey boy how do you talk'];
          s4dmessage.channel.send((listsGetRandomItem(response, false)));
      }

  });
  
  s4d.client.on('messageCreate', async (s4dmessage) => {
      if (((s4dmessage.mentions.members.first()).id) == '1139204206478229578') {
          response = ['hey u boy come here write statement', 'im calling your parents', 'hey u boy where is ur uniform why did farhad let u in', 'come here hold your ear stupid', 'hey u stupid come here, who gave u permission to call me by my name', 'hey you boy ur going to get suspended for 3 days', 'thats it u are getting transferred to other branch', 'im taking u to vp sir', 'how dare u', '*slaps*', 'what did u just say', 'amin sir pls bring my stick', 'hey you boy i heard you', 'hey you boy look at the board', 'you are coming with me', 'hey boy how do you talk'];
          s4dmessage.channel.send((listsGetRandomItem(response, false)));
      } else {}

  });


  s4d.client.on('messageCreate', async (s4dmessage) => {
      if (s4dmessage.author.bot) {
          return;
      }
      if (String(((s4dmessage.content).toLowerCase())).includes(String('loli'))) {
          response = ['u are going to marry one', 'she has to be 10 years younger than u', 'she will be your future wife', 'yes ', 'everyone has to marry a loli', 'marrying one will make make u good student', 'what is pedophilia, what is that', 'Anya best loli'];
          s4dmessage.channel.send((listsGetRandomItem(response, false)));
      }

  });

  s4d.client.on('messageCreate', async (s4dmessage) => {
      if (String(((s4dmessage.content).toLowerCase())).includes(String('gorur mangsho'))) {
          response = ['hey u boy why are u talking in the class', 'hey u boy where is ur uniform why did farhad let u in', 'ok', 'hey you boy i heard you', 'hey you boy look at the board', 'what did u just say', 'what'];
          s4dmessage.channel.send((listsGetRandomItem(response, false)));
      }

  });

  s4d.client.on('messageCreate', async (s4dmessage) => {
      if (((s4dmessage.content) || '').startsWith('Anya best loli' || '')) {
          s4dmessage.channel.send({
              content: String('||arsard er opinion not mine||')
          });
      }

  });

  s4d.client.on('messageCreate', async (s4dmessage) => {
      if (String(((s4dmessage.content).toLowerCase())).includes(String('beef'))) {
          s4dmessage.channel.send({
              content: String('astagfisrullah')
          });
      }

  });
  
  s4d.client.on('messageCreate', async (s4dmessage) => {
        if (((s4dmessage.content) || '').startsWith('!ganja' || '')) {
            if (((s4dmessage.author).id) == '814811369827598347') {
                s4dmessage.channel.send({
                    content: String('<a:despair:1152339082349916190>anja')
                });
            }
        }

    });

  s4d.client.on('messageCreate', async (s4dmessage) => {
        if (((s4dmessage.content) || '').startsWith('syupdate' || '')) {
            if (((s4dmessage.author).id) == '814811369827598347') {
                s4dmessage.channel.send({
                    content: String('The syllabus was updated!')
                });
            }
        }

    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (((s4dmessage.content) || '').startsWith('!ganja' || '')) {
            s4dmessage.delete();
        }

    });

s4d.client.on('messageCreate', async (s4dmessage) => {
        if (String((s4dmessage.content)).includes(String('phone'))) {
            s4dmessage.channel.send({
                content: String('hey you boy what is that in ur hand')
            });
        }

    });

  s4d.client.on('messageCreate', async (s4dmessage) => {
        if (String((s4dmessage.content)).includes(String('Phone'))) {
            s4dmessage.channel.send({
                content: String('hey you boy what is that in ur hand')
            });
        }

    });

   s4d.client.on('messageCreate', async (s4dmessage) => {
        if (String((s4dmessage.content)).includes(String('Sussy'))) {
            s4dmessage.channel.send({
                content: String('https://media.discordapp.net/attachments/1047889792760811601/1160225985304739910/Screenshot_2023-10-07_203900.png?ex=6533e3a6&is=65216ea6&hm=050dc310d1adfdc9b033e6b6dbe144084655cf383a64c25438c98bfe4275ed3a&=&width=975&height=662')
            });
            s4dmessage.channel.send({
                content: String('https://media.discordapp.net/attachments/1047889792760811601/1160226005588398170/Screenshot_2023-10-07_203909.png?ex=6533e3ab&is=65216eab&hm=d98ad5f337464c5b2e29fd90969275300d0b2348baef89689ef33141c48ca1fa&=&width=896&height=596')
            });
            s4dmessage.channel.send({
                content: String('https://media.discordapp.net/attachments/1047889792760811601/1160225893747265536/image.png?ex=6533e391&is=65216e91&hm=31ed5d16865fe72a68b595ebbd0ef2a4bc86d4e96666d34d284b33e3d1fc3ce7&=&width=896&height=207')
            });
            s4dmessage.channel.send({
                content: String('hehehahaw')
            });

          }

    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (((s4dmessage.content) || '').startsWith('deletexd' || '')) {
            s4dmessage.delete();
        }

    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (((s4dmessage.content) || '').startsWith('deletexd' || '')) {
            if (((s4dmessage.author).id) == '814811369827598347') {
                s4dmessage.channel.send({
                    content: String('as i said "deleting msgs is useless')
                });
            }
        }

    });
  
    s4d.client.on('interactionCreate', async (interaction) => {
      if ((interaction.commandName) == 'choose') {
          if ((interaction.options.getString('choice')) == 'bberb') {
              // true - only the person who t=did the comamnd can see it
              //
              // false - everyone can see it
              //
              //
              //
              await interaction.reply({
                  content: 'You chose the Big Berd',
                  ephemeral: false,
                  components: []
              });
          }
          if ((interaction.options.getString('choice')) == 'sberb') {
              // true - only the person who t=did the comamnd can see it
              //
              // false - everyone can see it
              //
              //
              //
              await interaction.reply({
                  content: 'You chose the Small Berd',
                  ephemeral: false,
                  components: []
              });
          }
          if ((interaction.options.getString('choice')) == 'knoif') {
              // true - only the person who t=did the comamnd can see it
              //
              // false - everyone can see it
              //
              //
              //
              await interaction.reply({
                  content: 'Why do you want a knife',
                  ephemeral: false,
                  components: []
              });
          }
      }

  });

  
    return s4d
})();
