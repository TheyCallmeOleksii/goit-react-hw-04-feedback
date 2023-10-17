import { useState } from 'react';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Section } from 'components/Section/Section';
import { Statistics } from 'components/Statistics/Statistics';
import { Notification } from 'components/Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const handleLeaveFeedback = option => {
    const mood = option.toLowerCase();
    if (mood === 'good') {
      setGood(prevState => prevState + 1);
    }
    if (mood === 'neutral') {
      setNeutral(prevState => prevState + 1);
    }
    if (mood === 'bad') {
      setBad(prevState => prevState + 1);
    }
  };

  const countPositiveFeedbackPercentage = () => {
    const countFeedback = countTotalFeedback();
    return Math.round((good * 100) / countFeedback);
  };

  // const { good, neutral, bad, total, positivePercentage } = this.state;
  const options = ['Good', 'Neutral', 'Bad'];
  const total = countTotalFeedback();
  const hasFeedback = total > 0;

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={handleLeaveFeedback}
        />
      </Section>

      {hasFeedback ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      ) : (
        <Section title="Statistics">
          <Notification message="There is no feedback" />
        </Section>
      )}
    </div>
  );
};
