# googlestuff - kleine Google-Hilfen

## Geburtstags-ICS
Google bietet einen Geburtstagskalender an, der aus der Kontaktliste generiert wird, und den man in seinen Google-Kalender einbinden kann. Das ist recht praktisch, hat aber seine Grenzen:
- Der Kalender zeigt immer die Geburtstage **aller** Kontakte. Das möchte man nicht unbedingt, ich möchte in meinem Kalender nur die Kontakte haben, die ich mit einem speziellen Label gekennzeichnet habe.
- Der Kalender zeigt nur, dass jemand Geburtstag hat, nicht jedoch das Alter.
- Der Kalender kann nicht, wie z.B. der Terminkalender, als ICS in andere Software eingebunden werden. Speziell interessant wäre die Einbindung in Hausautomatisierungs-Systeme.

Google bietet allerdings die Möglichkeit, selber Scripten einzubinden, aus diesen auf die eigenen Daten zuzugreifen (so auch auf die Kontakte), und das als Web-Service zu veröffentlichen. 
Dies kann man dazu benutzen, **selbst** einen Webservice zu bauen, der einen Geburtstagskalender nach den eigenen Wünschen erstellt.

## Gmail-Purge
Google bietet tolle Möglichkeiten, die Mail die man bekommt zu filtern.
Dieses Script soll diese Möglichkeiten erweitern:
- Mail mit bestimmten Labels, die **nicht** markiert sind, sollen nach einer bestimmten Zeit gelöscht werden,
ähnlich zum Spam und zum Paperkorb.
- Mail, die einen Label bekommt, aber im Posteingang verbleibt, soll nach einer bestimmten Zeit archivert werden, 
also aus dem Posteingang verschwinden.