# Geburtstagskalender mit Google
## Motivation

Google bietet einen Geburtstagskalender an, der aus der Kontaktliste generiert wird, und den man in seinen Google-Kalender einbinden kann. Das ist recht praktisch, hat aber seine Grenzen:
- Der Kalender zeigt immer die Geburtstage **aller** Kontakte. Das möchte man nicht unbedingt, ich möchte in meinem Kalender nur die Kontakte haben, die ich mit einem speziellen Label gekennzeichnet habe.
- Der Kalender zeigt nur, dass jemand Geburtstag hat, nicht jedoch das Alter.
- Der Kalender kann nicht, wie z.B. der Terminkalender, als ICS in andere Software eingebunden werden. Speziell interessant wäre die Einbindung in Hausautomatisierungs-Systeme.

Google bietet allerdings die Möglichkeit, selber Scripten einzubinden, aus diesen auf die eigenen Daten zuzugreifen (so auch auf die Kontakte), und das als Web-Service zu veröffentlichen. 
Dies kann man dazu benutzen, **selbst** einen Webservice zu bauen, der einen Geburtstagskalender nach den eigenen Wünschen erstellt.

## Einrichtung
Um den Geburtstagskalender einzurichten, muss man zuerst das Script einrichten. 
Zuerst braucht man natürlich ein Google Konto - das werde ich hier allerdings nicht beschreiben :)
Um das Script einzurichten, öffnet man am besten Google Drive (https://drive.google.com) und klickt dann auf Neu -> Mehr -> Google App Script.

![Alt-Text](/GeburtstagsICS/doc/newscript.jpg)

Es öffnet sich dann der Editor für die Datei Code.gs.
Da kopiert man den Inhalt von Code.gs hier im Repository hinein.
Das Projekt heisst noch "Unbenanntes Projekt, das kann man in "Geburtstagskalender" umbenennen.
Dann geht man im Menü nach Datei -> Neu -> Skriptdatei, legt "ics.js" an (ohne das abschließende .gs :)) und kopiert dahinein den Inhalt von ics.js.gs.

![Alt-Text](/GeburtstagsICS/doc/scripteditor.jpg)

Um das Ganze jetzt als Web-App zu veröffentlichen, muss man zuerst noch eine "Version" anlegen, dazu geht man nach 
Datei -> Versionen verwalten
und sichert den aktuellen Stand ab.

Dann nach Veröffentlichen -> Als Web App einrichten
und hier die Version einstellen, der Benutzer, unter dem der Service ausgeführt werden soll (man selber) und wer Zugriff haben soll (anonymous, jedermann).
Man muss jetzt noch ein paar Rechte bestätigen, oben den Link des Web Service rauskopieren, und schon kanns losgehen.

ACHTUNG:
- Der Zugriff ist dann NUR durch den Link geregelt, wer den Link kennt, kann zugreifen.

