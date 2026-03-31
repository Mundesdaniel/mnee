import hre from "hardhat";

const MNEE_TOKEN_ADDRESS = "0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF";
const SUBSCRIPTION_PRICE = hre.ethers.parseEther("10"); // 10 MNEE
const SUBSCRIPTION_DURATION = 30 * 24 * 60 * 60; // 30 days in seconds

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy MNEESubscription
  console.log("\nDeploying MNEESubscription...");
  const MNEESubscription = await hre.ethers.getContractFactory("MNEESubscription");
  const subscription = await MNEESubscription.deploy(
    MNEE_TOKEN_ADDRESS,
    SUBSCRIPTION_PRICE,
    SUBSCRIPTION_DURATION
  );
  await subscription.waitForDeployment();
  const subscriptionAddress = await subscription.getAddress();
  console.log("MNEESubscription deployed to:", subscriptionAddress);

  // Deploy MNEEStaking
  console.log("\nDeploying MNEEStaking...");
  const MNEEStaking = await hre.ethers.getContractFactory("MNEEStaking");
  const staking = await MNEEStaking.deploy(MNEE_TOKEN_ADDRESS);
  await staking.waitForDeployment();
  const stakingAddress = await staking.getAddress();
  console.log("MNEEStaking deployed to:", stakingAddress);

  // Summary
  console.log("\n========================================");
  console.log("Deployment Complete!");
  console.log("========================================");
  console.log("MNEE Token:        ", MNEE_TOKEN_ADDRESS);
  console.log("MNEESubscription:  ", subscriptionAddress);
  console.log("MNEEStaking:       ", stakingAddress);
  console.log("\nUpdate src/config.js with these addresses:");
  console.log(`export const MNEETokenAddress = "${MNEE_TOKEN_ADDRESS}";`);
  console.log(`export const MNEESubscriptionAddress = "${subscriptionAddress}";`);
  console.log(`export const MNEEStakingAddress = "${stakingAddress}";`);
  console.log("========================================");

  // Verify contracts if on a public network
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\nWaiting for block confirmations before verification...");
    await new Promise((resolve) => setTimeout(resolve, 30000));

    try {
      await hre.run("verify:verify", {
        address: subscriptionAddress,
        constructorArguments: [MNEE_TOKEN_ADDRESS, SUBSCRIPTION_PRICE, SUBSCRIPTION_DURATION],
      });
      console.log("MNEESubscription verified!");
    } catch (error) {
      console.log("MNEESubscription verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: stakingAddress,
        constructorArguments: [MNEE_TOKEN_ADDRESS],
      });
      console.log("MNEEStaking verified!");
    } catch (error) {
      console.log("MNEEStaking verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
