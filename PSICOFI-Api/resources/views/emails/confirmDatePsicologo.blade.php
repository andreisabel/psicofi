<!DOCTYPE html>
<html>
<head>
    <title>DAP: Confirmación de Cita</title>
</head>
<body>
    <div style="background-color: #004A98; color:white; font-size: x-large; font-weight: bold; font-family: Arial, Helvetica, sans-serif; padding: 20px 0px 0px 0px">
        <span style="padding-left: 20px;">UASLP</span><span style="padding: 0px 10px">|</span><span>DAP</span>
        <div style="background-color:#00B2E3; height:10px; margin-top:20px"></div>
    </div>
    <div id="content" style="background-color: #fafafa; padding: 30px; font-size: x-medium; font-family: Arial, Helvetica, sans-serif;">
        <h1>¡Hola {{ $details['psicologo'] }}</h1>
        <p>Te informamos que el alumno <b>{{ $details['name'] }}</b> ha confirmado la asistencia a su cita.</p>
        <h2>Detalles de la cita</h2>
        <p>Fecha: {{ $details['fecha'] }}</p>
        <p>Hora: {{ $details['hora'] }}</p>

        <?php
        
        $fecha = $details['fecha']; 
        $hora = $details['hora'];

        $local_timezone = new DateTimeZone('America/Mexico_City');
        $local_time = new DateTime("$fecha $hora", $local_timezone);
        
        $utc_timezone = new DateTimeZone('UTC');
        $local_time->setTimezone($utc_timezone);

        $local_time->modify('+1 hour');
        $start_time = $local_time->format('Ymd\THis\Z');

        $local_time->modify('+1 hour');
        $end_time = $local_time->format('Ymd\THis\Z');

        $google_calendar_url = "https://calendar.google.com/calendar/r/eventedit?text=Cita+psicologica&dates=$start_time/$end_time&details=Cita+en+el+Departamento+de+Atencion+Psicologica&location=UASLP%2C+Facultad+de+Ingenieria%2CDAP";
        ?>

        <p>
            <a href="<?php echo htmlspecialchars($google_calendar_url); ?>" style="color: #004A98; font-weight: bold;">
                Agregar esta cita a tu Google Calendar
            </a>
        </p>
        <br><br>
        <span style="font-size: small; justify-content: end; display: flex;">Este sólo es un email de confirmación automatizado, por favor no responder al destinatario.</span>
    </div>
    <div style="background-color: #004A98; color:white; font-size: x-medium; padding: 20px; font-weight: bold;font-family: Arial, Helvetica, sans-serif">
        Facultad de Ingeniería &copy;
    </div>
</body>
</html>
