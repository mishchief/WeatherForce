import React from 'react';
import { Card, Feed, Image } from 'semantic-ui-react';

const WeatherCard = ({ today, wDate, condition, cTemp, mxTemp, mTemp, wSpeed, wDirection, aPressure, hum, vis }) => {
    let date = new Date(wDate)
    let month = date.getMonth() + 1
    if (month < 10) { month = "0" + month; }
    let displayDate = month + "/" + date.getDate()
  
    return (
      <Card raised={true} style={cTemp === undefined ? null : {backgroundColor: '#4286f4'}}>
        <Card.Content>
          <Image size='mini' src={`https://www.metaweather.com/static/img/weather/png/64/${condition}.png`} />
          <Card.Header><br />{today === true ? "Today, " + displayDate : "Forecast " + displayDate}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {cTemp !== undefined ? <Feed.Event>
              <Feed.Content>
                <Feed.Meta content='Current Temperature ℃' />
                <Feed.Summary>
                  {cTemp.toFixed(2)}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event> : null}
  
            <Feed.Event>
              <Feed.Content>
                <Feed.Meta content='Max Temp / Min Temp ℃' />
                <Feed.Summary>
                  {mxTemp.toFixed(2)} / {mTemp.toFixed(2)}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
  
            <Feed.Event>
              <Feed.Content>
                <Feed.Meta content='Wind speed / Direction' />
                <Feed.Summary>
                  {wSpeed.toFixed(2)} mph/ {wDirection}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Content>
                <Feed.Meta content='Air pressure' />
                <Feed.Summary>
                  {aPressure.toFixed(2)} mbar
              </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Content>
                <Feed.Meta content='Humidity' />
                <Feed.Summary>
                  {hum.toFixed(2)} %
              </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Content>
                <Feed.Meta content='Visibility' />
                <Feed.Summary>
                  {vis.toFixed(2)} miles
              </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>)
  }
  
  
  export default WeatherCard;
  